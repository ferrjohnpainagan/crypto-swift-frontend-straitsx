import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Remit from './Remit'
import Wallet from './Wallet'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isActivePage = (page: string) => {
    return location.pathname.includes(page)
  }
  const handleRemit = () => {
    navigate('/remit/bank-login')
  }
  const handleWallet = () => {
    navigate('/wallet/home')
  }
  // const handleHome = () => {
  //   navigate('/remit/bank-login')
  // }
  return (
    <div className="flex h-20 w-screen items-center border-b-gray-400 bg-white px-24 shadow-sm">
      <div
        className="cursor-pointer font-poppins text-xl font-extrabold"
        // onClick={handleHome}
      >
        <a className="text-blue1">Crypto</a>
        <a className="text-indigo1">Swift</a>
      </div>
      <Remit isActivePage={isActivePage} handleRemit={handleRemit} />
      <Wallet isActivePage={isActivePage} handleWallet={handleWallet} />
    </div>
  )
}

export default Header
