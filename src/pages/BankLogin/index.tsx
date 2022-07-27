import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useXaveAPI } from 'hooks/useXaveAPI'
import type { AppDispatch } from '../../redux/store'

import BankLoginCard from './BankLoginCard'
import { usePlaidAuthAPI } from '../../hooks/usePlaidAuthAPI'
import Loader from '../../components/Loader/'

const BankLogin = () => {
  const NODE_ENV = process.env.NODE_ENV
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { linkBankAccount } = useXaveAPI()
  const [linkToken, setLinkToken] = useState('')
  const { generateLinkToken } = usePlaidAuthAPI()

  const handleLoginBank = async () => {
    setLoading(true)

    try {
      const response = await linkBankAccount()
      console.log(response)
      if (response.res.status == 200) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('exchangeBalance', '0')
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
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getLinkToken = async () => {
    const response = await generateLinkToken()
    const linkToken = response.data.linkToken

    console.log('linkToken:', linkToken)
    setLinkToken(linkToken)
  }

  useEffect(() => {
    localStorage.clear()
    if (NODE_ENV === 'development') return
    getLinkToken()
  }, [])

  return (
    <>
      {linkToken || NODE_ENV === 'development' ? (
        <BankLoginCard
          handleLoginBank={handleLoginBank}
          loading={loading}
          linkToken={linkToken}
          env={NODE_ENV}
        />
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </>
  )
}

export default BankLogin
