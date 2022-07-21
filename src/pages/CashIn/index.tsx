import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import currencyFormatter from 'currency-formatter'
import { useXaveAPI } from 'hooks/useXaveAPI'
import { isInputZero, isBalanceEnough } from 'utils/inputValidations'
import { randomCodeGenerator, randomNumberGenerator } from 'utils/codeGenerator'
import { CashInSubmitInterface } from 'interfaces'

import Dropdown from 'components/Dropdown'
import Card from 'components/Card'
import { CURRENCIES } from 'constants/index'
import Loader from 'components/Loader'
import Status from 'components/Status'

const { REACT_APP_SGD_BALANCE } = process.env

const CashIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const accountNumber = localStorage.getItem('accountNumber')
  const customerId = localStorage.getItem('customerId')
  const username = localStorage.getItem('username')
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('0.0')
  const [currency, setCurrency] = useState<any>(CURRENCIES[0])
  const [status, setStatus] = useState('pending')
  const [balance, setBalance] = useState<any>('')
  const [balancesObject, setBalancesObject] = useState<any>([])

  useEffect(() => {
    if (isLoggedIn == 'true') return
    navigate('/remit/bank-login')
  }, [])

  const { processCashIn, getCryptoWalletBalance } = useXaveAPI()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: 'all',
  })

  const onSubmit = async (data: CashInSubmitInterface) => {
    console.log(data)
    await handleCashIn(data)
  }

  const handleCashIn = async (data: CashInSubmitInterface) => {
    setLoading(true)
    setAmount(data.amount)
    try {
      const response = await processCashIn({
        username: username,
        customerId: customerId,
        bankAccountNumber: accountNumber,
        amount: data.amount,
      })

      const transactionId = randomCodeGenerator(6)

      if (response.status === 200) {
        setStatus('success')
        setTimeout(() => {
          navigate('/remit/success/cash-in', {
            state: {
              amount: data.amount,
              currency: currency,
              txId: transactionId,
            },
          })
        }, 1500)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
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
        <p className="font-workSans text-blue1">Cash-in</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between px-8 py-6">
          <div className="h-16">
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

            <button
              // type="button"
              type="submit"
              className={`mt-2 flex h-12 w-full justify-center rounded-lg ${
                !loading ? 'bg-blue1 hover:bg-blue2' : 'bg-gray1 opacity-50'
              }  py-3 font-workSans font-medium text-white`}
              disabled={loading}
            >
              {loading ? <Loader /> : 'Cash-in'}
            </button>
          </div>
        </div>
      </form>

      <div className="px-8 font-workSans text-black1">
        <div className="flex justify-between">
          <div className="text-xs">Deposited amount</div>
          <div className="text-xs font-semibold">
            {status === 'success' ? `${amount} ${currency.currency}` : '----'}
          </div>
        </div>
        <div className="flex justify-between pt-2 pb-6">
          <div className="text-xs">Status</div>
          <Status status={status} />
        </div>
      </div>
    </Card>
  )
}

export default CashIn
