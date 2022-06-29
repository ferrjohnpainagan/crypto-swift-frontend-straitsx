import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useXaveAPI } from 'hooks/useXaveAPI'
import { authenticateBank, setBankDetails } from '../../redux/account/actions'
import type { AppDispatch } from '../../redux/store'

import BankLoginCard from './BankLoginCard'

const BankLogin = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { linkBankAccount } = useXaveAPI()

  const handleLoginBank = async () => {
    setLoading(true)

    setTimeout(() => {
      dispatch(authenticateBank(true))
      navigate('/remit/cash-in')
    }, 1000)
    // try {
    //   const result = await linkBankAccount()
    //   if (result.status == 200) {
    //     dispatch(authenticateBank(true))
    //     navigate('/remit/cash-in', { state: result.data.data })
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    dispatch(authenticateBank(false))
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
