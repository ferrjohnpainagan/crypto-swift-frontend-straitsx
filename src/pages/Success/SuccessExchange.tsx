import React from 'react'
import Card from 'components/Card'
import Arrow from '../../assets/arrow.svg'
import SuccessExchangeIcon from '../../assets/success-exchange.svg'

const SuccessExchange = (props) => {
  const { sell, buy } = props.state
  const { nextBtn } = props

  return (
    <Card width={'30vw'}>
      <div className="flex flex-col items-center py-4">
        <div>
          <img src={SuccessExchangeIcon} alt="success-icon" />
        </div>
        <div className="py-2 font-workSans text-xl font-semibold text-blue1">
          Exchange Successful
        </div>
        <div className="py-1 font-workSans text-sm">
          Exchanged exactly {sell} for {buy}
        </div>
        <div className="py-1 font-workSans text-blue1 underline hover:cursor-pointer">
          View on Explorer
        </div>
        <div className="py-2">
          <button
            className="flex items-center rounded-md bg-blue1 py-2 px-4 font-medium text-white"
            onClick={() => nextBtn('cash-out')}
          >
            NEXT <img src={Arrow} className="pl-2" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default SuccessExchange
