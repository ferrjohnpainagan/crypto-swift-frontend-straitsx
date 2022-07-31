import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { randomCodeGenerator } from 'utils/codeGenerator'

import BankLogo from 'assets/bank-logo-2.svg'
import Loader from 'components/Loader'

const BankRecipient = () => {
  const [loading, setLoading] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm({
    criteriaMode: 'all',
  })

  const onSubmit = async (data) => {
    console.log(data)

    handleBankRecipient(data)
  }

  const handleBankRecipient = (data) => {
    setLoading(true)
    localStorage.setItem('bankAccountRecipient', data.accountNumber)

    setTimeout(() => {
      navigate('/remit/exchange')
    }, 1500)
  }

  const randomSwiftCodeGenerator = () => {
    const randomCode = randomCodeGenerator(8)
    setValue('swiftCode', randomCode)
  }

  const autoPopulateRecipient = () => {
    setValue('accountName', 'Kemal Hutapea')
    setValue(
      'accountNumber',
      // (Math.floor(Math.random() * 9000000000) + 1000000000).toString(),
      '5782298111',
    )
    randomSwiftCodeGenerator()
  }

  const handleLengthValidation = (value) => {
    return value.trim().length >= 8 && value.trim().length <= 16
  }

  return (
    <div
      style={{ width: '50vw' }}
      className="mx-16 flex flex-col items-center rounded-xl border border-solid border-cardStroke bg-white px-14 py-12"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{ width: '30vw' }}
          className="flex justify-between border border-gray1 px-10 py-4"
        >
          <img
            src={BankLogo}
            alt="bank-logo"
            className="cursor-pointer"
            onClick={autoPopulateRecipient}
          />
          <div className="ml-4">
            <div>
              <div className="font-workSans text-sm">Account Name</div>
              <input
                type="text"
                className="mt-1 rounded-lg border border-black p-2 text-sm text-gray1 outline-none"
                {...register('accountName', {
                  required: 'Account Name is required.',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="accountName"
                render={({ messages }) => {
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
            <div className="mt-1">
              <div className="font-workSans text-sm">Account Number</div>
              <Controller
                control={control}
                name="accountNumber"
                rules={{
                  required: 'Account number is required.',
                  validate: {
                    maxLength: (value) =>
                      handleLengthValidation(value) ||
                      'Account number must only have 8-16 digits.',
                  },
                }}
                render={({ field }) => (
                  <NumberFormat
                    {...field}
                    className="mt-1 rounded-lg border border-black p-2 text-sm text-gray1 outline-none"
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="accountNumber"
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
            <div className="mt-1">
              <div className="font-workSans text-sm">Swift Code</div>
              <input
                {...register('swiftCode', {
                  required: 'Swift Code is required.',
                })}
                type="password"
                className="mt-1 rounded-lg border border-black p-2 text-sm text-gray1 outline-none"
              />
              <ErrorMessage
                errors={errors}
                name="swiftCode"
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
        <div>
          <button
            type="submit"
            style={{ width: '30vw' }}
            className={`mt-6 flex h-12 justify-center rounded-lg bg-blue1 py-3 font-workSans text-white ${
              loading ? 'opacity-50' : 'hover:bg-blue2'
            }`}
            disabled={loading}
            // onClick={handleBankRecipient}
          >
            {loading ? <Loader /> : 'Enter Recipient Account Details'}
          </button>
        </div>
      </form>
      {/* <div className="mt-8 text-center font-workSans text-sm">
        The content of this webpage is not an investment advice and does not
        constitute any offer or solicitation to offer or recommendation of any
        investment product.
      </div> */}
    </div>
  )
}

export default BankRecipient
