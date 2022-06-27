import React from 'react'

import BankLogo from '../../assets/bank-logo.svg'
import Loader from 'components/Loader'

const BankLoginCard = ({ handleLoginBank, loading }) => {
  return (
    <div
      style={{ width: '50vw' }}
      className="mx-16 flex flex-col items-center rounded-xl border border-solid border-cardStroke bg-white px-14 py-12"
    >
      <div>
        <img src={BankLogo} alt="bank-logo" />
      </div>
      <div>
        <button
          type="button"
          style={{ width: '30vw' }}
          className={`mt-12 flex h-12 justify-center rounded-lg bg-blue1 py-3 font-workSans text-white ${
            loading ? 'opacity-50' : 'hover:bg-blue2'
          }`}
          disabled={loading}
          onClick={handleLoginBank}
        >
          {loading ? <Loader /> : 'Login To Bank'}
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

export default BankLoginCard
