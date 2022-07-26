import React from 'react'

const Remit = ({ isActivePage, handleRemit }) => {
  return (
    <button
      type="button"
      className={`ml-12 rounded-2xl font-workSans ${
        isActivePage('remit')
          ? 'border border-blue1 bg-defaultBg text-blue1'
          : 'text-black1'
      }  py-1 px-6 font-semibold `}
      onClick={handleRemit}
    >
      Remit
    </button>
  )
}

export default Remit
