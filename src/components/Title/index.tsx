import React from 'react'
import { useLocation } from 'react-router-dom'

const Title = () => {
  const location = useLocation()
  const isActivePage = (page: string) => {
    return location.pathname.includes(page)
  }
  let title: string

  switch (true) {
    case isActivePage('remit'):
      title = 'Crypto Swift'
      break
    case isActivePage('wallet'):
      title = 'My Wallet'
      break
    default:
      title = 'Crypto Swift'
      break
  }
  return (
    <div
      style={{ fontSize: '42px', width: '30vw' }}
      className="mt-6 text-right font-poppins font-semibold text-blue1"
    >
      {title}
    </div>
  )
}

export default Title
