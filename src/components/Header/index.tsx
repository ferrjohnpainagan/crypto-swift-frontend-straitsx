import React from 'react'
import Remit from './Remit'

const Header = () => {
  return (
    <div className="flex h-20 w-screen items-center border-b-gray-400 bg-white px-24 shadow-sm">
      <div className="font-poppins text-xl font-extrabold">
        <a className="text-blue1">Crypto</a>
        <a className="text-indigo1">Swift</a>
      </div>
      <Remit />
    </div>
  )
}

export default Header
