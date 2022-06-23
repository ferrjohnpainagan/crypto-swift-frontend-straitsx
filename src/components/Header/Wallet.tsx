import React from 'react'

const Wallet = ({ isActivePage, handleWallet }) => {
  return (
    <button
      type="button"
      className={`ml-8 rounded-2xl font-workSans ${
        isActivePage('wallet')
          ? 'border border-blue1 bg-defaultBg text-blue1'
          : 'text-black1'
      }  py-1 px-6 font-semibold `}
      onClick={handleWallet}
    >
      Wallet
    </button>
  )
}

export default Wallet
