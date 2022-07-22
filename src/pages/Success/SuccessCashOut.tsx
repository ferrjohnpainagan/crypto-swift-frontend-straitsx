import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import currencyFormatter from 'currency-formatter'

import Card from 'components/Card'
import ArrowRight from '../../assets/arrow-right.svg'
// import SuccessCashOutIcon from '../../assets/success-cash-out.svg'
import SuccessCashOutIcon from 'assets/cash_out.png'

const SuccessCashOut = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathState: any = location?.state || false

  useEffect(() => {
    if (!pathState) {
      navigate('/remit/cash-out')
    }
  }, [])

  const { amount, currency, txId } = pathState

  return (
    <Card width={'30vw'}>
      <div className="flex flex-col items-center py-4 px-10">
        <div>
          <img src={SuccessCashOutIcon} alt="success-icon" />
        </div>
        <div className="py-2 font-workSans text-xl font-semibold text-blue1">
          Remittance Successful
        </div>
        <div className="py-1 font-workSans text-sm">
          Transaction ID:{' '}
          <a className="cursor-pointer font-workSans text-blue1 underline">
            {txId}
          </a>
        </div>
        <div className="my-2 flex w-full justify-center rounded-lg border border-vanilla2 bg-vanilla1 px-4 py-2">
          {/* <div>
            <a className="font-roboto text-2xl">{amount}</a>
            <a className="pl-2 font-workSans text-base text-black1">
              {currency.currency}
            </a>
          </div>
          <div className="flex items-center">
            <img src={ArrowRight} />
          </div> */}

          <div>
            <a className="font-roboto text-2xl font-semibold text-blue1">
              {currencyFormatter.format(amount, {})}
            </a>
            <a className="pl-2 font-workSans text-base text-black1">
              {currency?.currency}
            </a>
          </div>
        </div>
        {/* <div className="py-1 font-workSans text-blue1 underline hover:cursor-pointer">
          View on Explorer
        </div> */}
      </div>
    </Card>
  )
}

export default SuccessCashOut
