import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useXaveAPI } from 'hooks/useXaveAPI'
import type { AppDispatch } from '../../redux/store'

import BankLoginCard from './BankLoginCard'

const BankLogin = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { linkBankAccount } = useXaveAPI()

  const handleLoginBank = async () => {
    setLoading(true)

    try {
      const response = await linkBankAccount()
      console.log(response)
      if (response.res.status == 200) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem(
          'accountHolderName',
          response.res.data.data.bankAccount.account_holder_name,
        )
        localStorage.setItem(
          'accountNumber',
          response.res.data.data.bankAccount.account_no,
        )
        localStorage.setItem(
          'customerId',
          response.res.data.data.customer.data.id,
        )
        localStorage.setItem('username', response.username)
        navigate('/remit/cash-in')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <>
      <div>
        <BankLoginCard handleLoginBank={handleLoginBank} loading={loading} />
      </div>
    </>
  )
}

export default BankLogin
