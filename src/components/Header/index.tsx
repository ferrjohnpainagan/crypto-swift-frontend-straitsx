import React from 'react'
import Remit from './Remit'

const Header = () => {
  return (
    <div className="flex h-20 w-screen items-center border-b-gray-400 px-24 shadow-sm">
      <div className="font-extrabold">
        <a className="text-blue1">Lorem</a>{' '}
        <a className="text-indigo1">Ipsum</a>
      </div>
      <Remit />
    </div>
  )
}

export default Header
