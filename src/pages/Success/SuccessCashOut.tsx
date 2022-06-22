import React from 'react'
import Card from 'components/Card'
import ArrowRight from '../../assets/arrow-right.svg'
import SuccessCashOutIcon from '../../assets/success-cash-out.svg'
const SuccessCashOut = (props) => {
  console.log(props.state)
  const { amount, currency, cashOutAmount, cashOutCurrency } = props.state
  return (
    <Card width={'30vw'}>
      <div className="flex flex-col items-center py-4 px-10">
        <div>
          <img src={SuccessCashOutIcon} alt="success-icon" />
        </div>
        <div className="py-2 font-workSans text-xl font-semibold text-blue1">
          Remittance Successful
        </div>
        <div className="my-2 flex w-full justify-between rounded-lg border border-vanilla2 bg-vanilla1 px-4 py-2">
          <div>
            <a className="font-roboto text-2xl">{amount}</a>
            <a className="pl-2 font-workSans text-base text-black1">
              {currency.currency}
            </a>
          </div>
          <div className="flex items-center">
            <img src={ArrowRight} />
          </div>
          <div>
            <a className="font-roboto text-2xl font-semibold text-blue1">
              {cashOutAmount}
            </a>
            <a className="pl-2 font-workSans text-base text-black1">
              {cashOutCurrency}
            </a>
          </div>
        </div>
        <div className="py-1 font-workSans text-blue1 underline hover:cursor-pointer">
          View on Explorer
        </div>
      </div>
    </Card>
  )
}

export default SuccessCashOut
