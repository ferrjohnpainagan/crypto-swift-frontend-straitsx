import React, { useState } from 'react'
import BankLogo from 'assets/bank-logo-2.svg'
import Loader from 'components/Loader'

const BankRecipient = () => {
  const [loading, setLoading] = useState(false)
  const handleBankRecipient = () => {}
  return (
    <div
      style={{ width: '50vw' }}
      className="mx-16 flex flex-col items-center rounded-xl border border-solid border-cardStroke bg-white px-14 py-12"
    >
      <div
        style={{ width: '30vw' }}
        className="flex justify-between border border-gray1 px-10 py-4"
      >
        <img src={BankLogo} alt="bank-logo" />
        <div className="ml-4">
          <div>
            <div className="font-workSans text-sm">Account Name</div>
            <input
              type="text"
              className="mt-1 rounded-lg border border-black p-2 text-sm text-gray1 outline-none"
            />
          </div>
          <div className="mt-1">
            <div className="font-workSans text-sm">Account Number</div>
            <input
              type="text"
              className="mt-1 rounded-lg border border-black p-2 text-sm text-gray1 outline-none"
            />
          </div>
          <div className="mt-1">
            <div className="font-workSans text-sm">Swift Code</div>
            <input
              type="password"
              className="mt-1 rounded-lg border border-black p-2 text-sm text-gray1 outline-none"
            />
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          style={{ width: '30vw' }}
          className={`mt-6 flex h-12 justify-center rounded-lg bg-blue1 py-3 font-workSans text-white ${
            loading ? 'opacity-50' : 'hover:bg-blue2'
          }`}
          disabled={loading}
          onClick={handleBankRecipient}
        >
          {loading ? <Loader /> : 'Enter Recipient Account Details'}
        </button>
      </div>
      <div className="mt-8 text-center font-workSans text-sm">
        The content of this webpage is not an investment advice and does not
        constitute any offer or solicitation to offer or recommendation of any
        investment product.
      </div>
    </div>
  )
}

export default BankRecipient
