import React from 'react'
import { useNavigate } from 'react-router-dom'
import BankLogo from '../../assets/bank-logo.svg'

import { usePlaidLink } from 'react-plaid-link';

const BankLoginCard = () => {
  const navigate = useNavigate()
  const handleLoginBank = () => {
    // navigate('/cash-in')
  }
  const { open, ready } = usePlaidLink({
  token: 'link-sandbox-6095c605-47ab-498f-862f-a712a75bbf79',
  onSuccess: (public_token, metadata) => {
    // send public_token to server
    navigate('/cash-in')
    },
  });

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
          className="mt-12 rounded-lg bg-blue1 py-3 font-workSans text-white hover:bg-blue2"
          // onClick={handleLoginBank}
          onClick={() => open()}
          disabled={!ready}
        >
          Login To Bank
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
