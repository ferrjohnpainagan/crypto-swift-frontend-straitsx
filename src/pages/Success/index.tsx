import React, { useEffect } from 'react'
import _ from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom'
import SuccessCashIn from './SuccessCashIn'

const Success = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const pathState = location.state
  const isSuccessPage = currentPath.includes('success')
  const isPathStateNotEmpty = !_.isEmpty(pathState)

  const handleNext = (type: string) => {
    switch (type) {
      case 'exchange':
        navigate('/exchange')
        break
      case 'cash-out':
        navigate('cash-out')
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (isSuccessPage && isPathStateNotEmpty) {
      return
    }
    navigate('/bank-login')
  }, [])

  switch (true) {
    case currentPath.includes('cash-in'):
      return <SuccessCashIn state={pathState} nextBtn={handleNext} />

    default:
      return <></>
  }
}

export default Success
