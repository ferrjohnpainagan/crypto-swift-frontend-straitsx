import React from 'react'
import Card from 'components/Card'
import Arrow from '../../assets/arrow.svg'
import SuccessCashInIcon from '../../assets/safe 1.svg'

const SuccessCashIn = (props) => {
  const { amount, currency, txId } = props.state
  const { nextBtn } = props

  return (
    <Card width={'30vw'}>
      <div className="flex flex-col items-center py-4">
        <div>
          <img src={SuccessCashInIcon} alt="success-icon" />
        </div>
        <div className="py-2 font-workSans text-xl font-semibold text-blue1">
          Cash-in Successful
        </div>
        <div className="py-1 font-workSans text-sm">
          Transaction ID:{' '}
          <a className="cursor-pointer font-workSans text-blue1 underline">
            {txId}
          </a>
        </div>
        <div className="py-1 font-workSans text-sm">
          Cash-in exactly {amount} {currency.currency}
        </div>
        {/* <div className="py-1 font-workSans text-blue1 underline hover:cursor-pointer">
          View on Explorer
        </div> */}
        <div className="py-2">
          <button
            className="flex items-center rounded-md bg-blue1 py-2 px-4 font-medium text-white"
            onClick={() => nextBtn('bank-recipient')}
          >
            NEXT <img src={Arrow} className="pl-2" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default SuccessCashIn
