import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from 'components/Card'

const ErrorPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathState: any = location?.state || false
  const { message } = pathState

  return (
    <Card width={'40vw'}>
      <div className="flex flex-col items-center py-4 px-10">
        <div>{/* <img src={SuccessCashOutIcon} alt="success-icon" /> */}</div>
        <div className="py-2 font-workSans text-xl font-semibold text-red-600">
          {message ? message : 'This page does not exist.'}
        </div>
      </div>
      <div className="flex justify-center pb-8">
        <button
          style={{ width: '20vw' }}
          type="button"
          className={`mt-4 flex w-full justify-center rounded-lg bg-blue1 py-3 font-workSans font-medium text-white hover:bg-blue2`}
          onClick={() => navigate('/remit/bank-login')}
        >
          Back to home
        </button>
      </div>
    </Card>
  )
}

export default ErrorPage
