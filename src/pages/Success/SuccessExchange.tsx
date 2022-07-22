import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import currencyFormatter from 'currency-formatter'

import Card from 'components/Card'
import Arrow from '../../assets/arrow.svg'
// import SuccessExchangeIcon from '../../assets/success-exchange.svg'
import SuccessExchangeIcon from 'assets/exchange.png'

const SuccessExchange = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathState: any = location?.state || false

  useEffect(() => {
    if (!pathState) {
      navigate('/remit/exchange')
    }
  }, [])

  const { sellAmount, sellCurrency, buyAmount, buyCurrency, txHash } = pathState

  return (
    <Card width={'30vw'}>
      <div className="flex flex-col items-center py-4">
        <div>
          <img src={SuccessExchangeIcon} alt="success-icon" />
        </div>
        <div className="py-2 font-workSans text-xl font-semibold text-blue1">
          Exchange Successful
        </div>
        <div className="py-1 text-center font-workSans text-sm">
          Exchanged exactly{' '}
          {currencyFormatter.format(sellAmount, {
            symbol: sellCurrency,
            format: '%v %s',
          })}{' '}
          for{' '}
          {currencyFormatter.format(buyAmount, {
            symbol: buyCurrency,
            format: '%v %s',
          })}
        </div>
        <div
          className="py-1 font-workSans text-blue1 underline hover:cursor-pointer"
          onClick={() => {
            window.open(txHash)
          }}
        >
          View on Explorer
        </div>
        <div className="py-2">
          <button
            className="flex items-center rounded-md bg-blue1 py-2 px-4 font-medium text-white"
            onClick={() => navigate('/remit/cash-out')}
          >
            NEXT <img src={Arrow} className="pl-2" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default SuccessExchange
