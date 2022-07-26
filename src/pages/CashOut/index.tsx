import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import currencyFormatter from 'currency-formatter'
import { useXaveAPI } from 'hooks/useXaveAPI'
import { useStraitsAPI } from 'hooks/useStraitsAPI'
import { randomCodeGenerator, randomNumberGenerator } from 'utils/codeGenerator'
import { isInputZero, isBalanceEnough } from 'utils/inputValidations'
import BigNumber from 'bignumber.js'

import Card from 'components/Card'
import Dropdown from 'components/Dropdown'
import Loader from 'components/Loader'
import Status from 'components/Status'
import { CURRENCIES } from 'constants/index'

const { REACT_APP_IDR_BALANCE } = process.env

const CashOut = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const customerId = localStorage.getItem('customerId')
  const accountNumber = localStorage.getItem('bankAccountRecipient')
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const [currency, setCurrency] = useState<any>(CURRENCIES[0])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('pending')
  const [balance, setBalance] = useState<any>('')
  const [balancesObject, setBalancesObject] = useState<any>([])

  const { getCryptoWalletBalance } = useXaveAPI()
  const { processCashOut } = useStraitsAPI()

  useEffect(() => {
    if (isLoggedIn == 'true') return
    navigate('/remit/bank-login')
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    criteriaMode: 'all',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    await handleCashOut(data)
    // const response = await isBalanceEnough(data.amount)

    // if (response) {
    //   await handleCashOut(data)
    // } else {
    //   setLoading(false)
    //   setError('amount', {
    //     type: 'error',
    //     message: "You don't have enough balance.",
    //   })
    // }
  }

  //** Won't be used for mock testing */
  // const isBalanceEnough = async (amount: string) => {
  //   const response = await getCryptoWalletBalance()
  //   const balanceObject = response

  //   let walletBalance
  //   for (const [key, value] of Object.entries(balanceObject)) {
  //     if (key === currency.stableCoin) {
  //       walletBalance = new BigNumber(value as string).toFixed(2)
  //     }
  //   }

  //   return parseFloat(walletBalance) > parseFloat(amount)
  // }

  const handleCashOut = async (data) => {
    const cashOutAmount = data.amount
    setLoading(true)

    try {
      const response = await processCashOut({
        // username: username,
        customerProfileId:
          'customer_profile_83d91c19-9d38-4cbc-baa2-6c4bafd67d42',
        bankAccountNumber: '9122234441',
        amount: data.amount,
      })

      const transactionId = randomCodeGenerator(6)
      console.log(response)
      if (response.status === 200) {
        setStatus('success')

        setTimeout(() => {
          navigate('/remit/success/cash-out', {
            state: {
              amount: cashOutAmount,
              currency: currency,
              txId: transactionId,
            },
          })
        }, 1500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMax = () => {
    setValue('amount', balance)
  }

  const handleSelectCurrency = (currency) => {
    setCurrency(currency)
    if (currency.currency === 'SGD') {
      setBalance(balancesObject.xSGD)
    } else if (currency.currency === 'IDR') {
      setBalance(balancesObject.xIDR)
    }
  }

  const handleGetWalletBalance = async (inputCurrency) => {
    const response = await getCryptoWalletBalance()
    const entries = Object.entries(response)

    let balances = {} as any
    let amount
    for (const [symbol, balance] of entries) {
      amount = new BigNumber(balance as string)
        .div(10 ** 6)
        .toFixed(2)
        .toString()
      balances = { ...balances, [symbol]: currencyFormatter.format(amount, {}) }

      if (inputCurrency === symbol) {
        setBalance(currencyFormatter.format(amount, {}))
      }
    }

    setBalancesObject(balances)
  }

  useEffect(() => {
    handleGetWalletBalance(CURRENCIES[0].stableCoin)
  }, [])

  return (
    <Card width={'35vw'}>
      <div className="flex h-16 w-full items-center border-b pl-8">
        <p className="font-workSans text-blue1">Cash-out</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <Dropdown
              name={'Select'}
              options={CURRENCIES}
              selected={currency}
              setSelected={handleSelectCurrency}
            />
          </div>
          <div style={{ width: '18vw' }}>
            <div className="text-md font-workSans font-semibold text-black1">
              Amount
            </div>
            <div className="flex justify-between rounded-lg bg-vanilla1 p-3 align-bottom">
              <div className="flex flex-col">
                <div className="font-workSans text-xs">
                  BALANCE: {balance} {currency.currency}{' '}
                </div>
                <Controller
                  control={control}
                  name="amount"
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
                      isBalanceEnough: (value) =>
                        isBalanceEnough(
                          currencyFormatter.unformat(balance, {}),
                          value,
                        ) || "You don't have enough balance.",
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      decimalScale={2}
                      className="align-end mt-4 flex w-full border-none border-transparent bg-transparent font-roboto text-2xl focus:outline-none"
                    />
                  )}
                />
              </div>
              <div className="flex self-end">
                <button
                  type="button"
                  className="rounded-xl border border-blue1 p-1 text-xs text-blue1"
                  onClick={handleMax}
                >
                  MAX
                </button>
              </div>
            </div>
            <div className="mt-2 h-8">
              <ErrorMessage
                errors={errors}
                name="amount"
                render={({ messages }: any) => {
                  return messages
                    ? Object.entries(messages).map(([type, message]: any) => (
                        <p
                          className="font-workSans text-xs text-red-600"
                          key={type}
                        >
                          {message}
                        </p>
                      ))
                    : errors.amount && (
                        <p className="font-workSans text-xs text-red-600">
                          {errors.amount.message as any}
                        </p>
                      )
                }}
              />
            </div>

            <button
              type="submit"
              className={`mt-6 flex w-full justify-center rounded-lg  ${
                !loading ? 'bg-blue1 hover:bg-blue2' : 'bg-gray1 opacity-50'
              }  py-3 font-workSans font-medium text-white`}
              // onClick={handleCashOut}
            >
              {loading ? <Loader /> : 'Cash-out'}
            </button>
          </div>
        </div>
      </form>

      <div className="px-8 font-workSans text-black1">
        {/* <div className="flex justify-between">
          <div className="text-xs">Exchange Rate</div>
          <div className="text-xs font-bold">1 SGD = {exchangeRate} IDR</div>
        </div> */}
        <div className="flex justify-between pt-2 pb-6">
          <div className="text-xs">Status</div>
          <Status status={status} />
        </div>
      </div>
    </Card>
  )
}

export default CashOut
