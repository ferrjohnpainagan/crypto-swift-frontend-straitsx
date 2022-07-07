import React, { useEffect } from 'react'
import _ from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom'
import SuccessCashIn from './SuccessCashIn'
import SuccessExchange from './SuccessExchange'
import SuccessCashOut from './SuccessCashOut'

const Success = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const pathState = location?.state || false
  const isSuccessPage = currentPath.includes('success')

  const handleNext = (type: string) => {
    switch (type) {
      case 'bank-recipient':
        navigate('/remit/bank-recipient')
        break
      case 'exchange':
        navigate('/remit/exchange')
        break
      case 'cash-out':
        navigate('/remit/cash-out')
        break
      default:
        break
    }
  }

  const renderComponent = () => {
    switch (true) {
      //   case currentPath.includes('cash-in'):
      //     return <SuccessCashIn state={pathState} nextBtn={handleNext} />
      //   case currentPath.includes('exchange'):
      //     return <SuccessExchange state={pathState} nextBtn={handleNext} />
      //   case currentPath.includes('cash-out'):
      //     return <SuccessCashOut state={pathState} />
      default:
        return <></>
    }
  }

  return renderComponent()
}

export default Success
