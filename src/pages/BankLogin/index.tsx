import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useXaveAPI } from 'hooks/useXaveAPI'

import BankLoginCard from './BankLoginCard'

const BankLogin = () => {
  const navigate = useNavigate()
  const { linkBankAccount } = useXaveAPI()

  const handleLoginBank = async () => {
    try {
      const result = await linkBankAccount()
      console.log(result)
      // navigate('/remit/cash-in')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>
        <BankLoginCard handleLoginBank={handleLoginBank} />
      </div>
    </>
  )
}

export default BankLogin
