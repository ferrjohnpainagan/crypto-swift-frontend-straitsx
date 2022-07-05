import React from 'react'

const Status = ({ status }) => {
  return (
    <div
      className={`text-xs ${
        status === 'pending' ? 'text-black1' : 'font-semibold text-green-500'
      }`}
    >
      {status === 'pending' ? '----' : 'Success'}
    </div>
  )
}

export default Status
