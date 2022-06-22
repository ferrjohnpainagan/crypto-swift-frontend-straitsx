import React from 'react'
import { useNavigate } from 'react-router-dom'
import Remit from './Remit'

const Header = () => {
  const navigate = useNavigate()
  const handleHome = () => {
    navigate('/bank-login')
  }
  return (
    <div className="flex h-20 w-screen items-center border-b-gray-400 bg-white px-24 shadow-sm">
      <div
        className="cursor-pointer font-poppins text-xl font-extrabold"
        onClick={handleHome}
      >
        <a className="text-blue1">Crypto</a>
        <a className="text-indigo1">Swift</a>
      </div>
      <Remit />
    </div>
  )
}

export default Header
