import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import NumberFormat from 'react-number-format'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useCurrencyAPI } from 'hooks/useCurrencyAPI'
import { useXaveAPI } from 'hooks/useXaveAPI'
import { calcExchangeRate } from 'utils/exchangeRate'
import { isInputZero } from 'utils/inputValidations'
import BigNumber from 'bignumber.js'
import debounce from 'lodash.debounce'

import Card from 'components/Card'
import CurrencyDropdown from './CurrencyDropdown'
import { CURRENCIES } from 'constants/index'
import CurrentExchangeIcons from './CurrentExchangeIcons'
import ExchangeIcon from '../../assets/exchange.svg'
import Status from 'components/Status'
import Loader from 'components/Loader'

const Exchange = () => {
  let count = 0
  const THRESHOLD = 5
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const [sell, setSell] = useState({ stableCoin: 'xSGD' })
  const [buy, setBuy] = useState({ stableCoin: 'xIDR' })
  const [status, setStatus] = useState('pending')
  const [exchangeRate, setExchangeRate] = useState('0')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn == 'true') return
    navigate('/remit/bank-login')
  }, [])

  const { getExchangeRate } = useCurrencyAPI()
  const { processExchange, getCryptoWalletBalance, viewStablecoinSwap } =
    useXaveAPI()

  useEffect(() => {
    handleExchangeRate()
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
    register,
    reset,
    getValues,
  } = useForm({
    criteriaMode: 'all',
  })

  useEffect(() => {
    let defaultValues: any = {}
    register('sell')
    register('buy')
    register('general')
    defaultValues.sell = 'xSGD'
    defaultValues.buy = 'xIDR'
    reset({ ...defaultValues })
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await isBalanceEnough(data.sellAmount)

    if (response) {
      await handleExchange(data)
    } else {
      setLoading(false)
      setError('sellAmount', {
        type: 'error',
        message: "You don't have enough balance.",
      })
    }
  }

  const isBalanceEnough = async (amount: string) => {
    const response = await getCryptoWalletBalance()
    const balanceObject = response

    let walletBalance
    for (const [key, value] of Object.entries(balanceObject)) {
      if (key === sell.stableCoin) {
        walletBalance = new BigNumber(value as string).toFixed(2)
      }
    }

    return parseFloat(walletBalance) > parseFloat(amount)
  }

  const handleExchange = async (data) => {
    const sellAmount = Math.round(data.sellAmount).toString()
    const buyAmount = Math.round(data.buyAmount).toString()

    const amountToWei = ethers.utils.parseUnits(sellAmount, 6)
    const amount = ethers.utils.formatUnits(amountToWei, 'wei')
    /**
     * TODO
     * implement retry on provider related error
     */

    if (count > THRESHOLD) {
      setLoading(false)
      setError('sellAmount', {
        type: 'error',
        message: 'Internal provider error. Please try again later',
      })
    } else {
      try {
        count += 1

        const response = await processExchange(Number(amount))
        const txHash = `https://polygonscan.com/tx/${response.data.data.transactionHash}`

        if (response.status === 200) {
          setStatus('success')
          setTimeout(() => {
            navigate('/remit/success/exchange', {
              state: {
                sellAmount: sellAmount,
                sellCurrency: sell.stableCoin,
                buyAmount: buyAmount,
                buyCurrency: buy.stableCoin,
                txHash: txHash,
              },
            })
          }, 1000)
        }
        console.log(response)
      } catch (error) {
        count += 1
        console.log('retry')
        await handleExchange(data)
        console.log(error)
      }
    }
  }

  const handleInputChange = debounce(async (type: string, input: string) => {
    setLoading(true)
    let calculatedAmount
    let rate

    await handleExchangeRate()

    rate = exchangeRate
    clearErrors()

    if (type === 'sell') {
      setValue('sellAmount', input)
      calculatedAmount =
        parseFloat(input) * parseFloat(rate)
          ? (parseFloat(input) * parseFloat(rate)).toString()
          : ''

      setValue('buyAmount', calculatedAmount)
    } else {
      setValue('buyAmount', input)
      /**
       * Rate is calculated differently when the buy input is being changed
       * to correctly handle conversion
       */
      rate = 1 / parseFloat(exchangeRate)
      calculatedAmount =
        parseFloat(input) * parseFloat(rate)
          ? (parseFloat(input) * parseFloat(rate)).toString()
          : ''

      setValue('sellAmount', calculatedAmount)
    }
    setLoading(false)
  }, 1200)

  const handleExchangeRate = async () => {
    setExchangeRate('----')

    const amountToWei = ethers.utils.parseUnits('1', 6)
    const amount = ethers.utils.formatUnits(amountToWei, 'wei')
    const response = await viewStablecoinSwap(amount)

    const rate = new BigNumber(response.data.data.rate)
      .div(10 ** 6)
      .toFixed(2)
      .toString()

    setExchangeRate(rate)
  }

  const handleCurrencyChange = (type: string, currency: any) => {
    if (type === 'sell') {
      setSell(currency)
      setValue('sell', currency.stableCoin)
    } else {
      setBuy(currency)
      setValue('buy', currency.stableCoin)
    }
    let values = getValues(['sell', 'buy'])

    if ([...new Set(values)].length === 1) {
      setError('general', {
        type: 'error',
        message:
          'Sell and Buy should not be of the same currency. Please change.',
      })
    } else {
      clearErrors('general')
    }
    console.log(type, currency.stableCoin)
  }

  return (
    <Card width={'35vw'}>
      <div className="flex h-16 w-full items-center justify-between border-b px-8">
        <p className="font-workSans text-blue1">Exchange Currency</p>
        <CurrentExchangeIcons buy={buy} sell={sell} currencies={CURRENCIES} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-8">
          <div className="flex justify-between">
            <div>
              <div className="py-2 font-workSans">
                <a className="text-gray1">Sell</a>
                <CurrencyDropdown
                  name={'Select'}
                  options={CURRENCIES}
                  selected={sell}
                  setSelected={handleCurrencyChange}
                  type={'sell'}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="sellAmount"
                  rules={{
                    required: 'Amount is required.',
                    pattern: {
                      value: /^[0-9.]*$/,
                      message: 'Amount cannot be a negative value.',
                    },
                    min: {
                      value: 1,
                      message: 'Minimum amount is 1.',
                    },
                    validate: {
                      zeroValueInput: (value) =>
                        !isInputZero(value) || 'Amount cannot be zero.',
                    },
                    onChange: (e) => {
                      handleInputChange('sell', e.target.value)
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      decimalScale={2}
                      className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                    />
                  )}
                />
                <div className="mt-2 h-8">
                  <ErrorMessage
                    errors={errors}
                    name="sellAmount"
                    render={({ messages }) => {
                      console.log('messages', messages)
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p
                              className="font-workSans text-xs text-red-600"
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        : errors.sellAmount && (
                            <p className="font-workSans text-xs text-red-600">
                              {errors.sellAmount.message as any}
                            </p>
                          )
                    }}
                  />
                </div>
              </div>
            </div>

            <img
              src={ExchangeIcon}
              className="self-middle mx-2 mb-3 mt-8 flex"
            />

            <div>
              <div className="py-2 font-workSans">
                <a className="text-gray1">Buy</a>
                <CurrencyDropdown
                  name={'Select'}
                  options={CURRENCIES}
                  selected={buy}
                  setSelected={handleCurrencyChange}
                  type={'buy'}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="buyAmount"
                  rules={{
                    required: 'Amount is required.',
                    pattern: {
                      value: /^[0-9.]*$/,
                      message: 'Amount cannot be a negative value.',
                    },
                    min: {
                      value: 1,
                      message: 'Minimum amount is 1.',
                    },
                    validate: {
                      zeroValueInput: (value) =>
                        !isInputZero(value) || 'Amount cannot be zero.',
                    },
                    onChange: (e) => {
                      handleInputChange('buy', e.target.value)
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      decimalScale={2}
                      className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                      // disabled={true}
                    />
                  )}
                />
                <div className="mt-2 h-8">
                  <ErrorMessage
                    errors={errors}
                    name="buyAmount"
                    render={({ messages }) => {
                      console.log('messages', messages)
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p
                              className="font-workSans text-xs text-red-600"
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        : null
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="general"
            render={({ messages }) => {
              console.log(errors.general)
              return (
                errors.general && (
                  <p className="font-workSans text-xs text-red-600">
                    {errors.general.message as any}
                  </p>
                )
              )
            }}
          />
          <div className="pb-6">
            <button
              type="submit"
              className={`mt-6 flex w-full justify-center rounded-lg bg-blue1 py-3 font-workSans font-medium text-white ${
                loading ? 'opacity-50' : 'hover:bg-blue2'
              }`}
              disabled={loading}
            >
              {loading ? <Loader /> : 'Exchange'}
            </button>
          </div>

          <div className="font-workSans text-black1">
            <div className="flex justify-between">
              <div className="text-xs">Exchange Rate</div>
              <div className="text-xs font-bold">
                1 {sell.stableCoin} = {exchangeRate} {buy.stableCoin}
              </div>
            </div>
            <div className="flex justify-between pt-2 pb-6">
              <div className="text-xs">Status</div>
              <Status status={status} />
            </div>
          </div>
        </div>
      </form>
    </Card>
  )
}

export default Exchange
