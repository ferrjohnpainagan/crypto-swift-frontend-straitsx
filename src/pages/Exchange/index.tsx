import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'components/Card'
import CurrencyDropdown from './CurrencyDropdown'
import { CURRENCIES } from 'constants/index'
import CurrentExchangeIcons from './CurrentExchangeIcons'
import ExchangeIcon from '../../assets/exchange.svg'

const Exchange = () => {
  const [sell, setSell] = useState({ currency: 'SGD' })
  const [buy, setBuy] = useState({ currency: 'IDR' })
  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [status, setStatus] = useState()
  const navigate = useNavigate()

  const handleExchange = () => {
    navigate('/success/exchange', {
      state: {
        sell: `${sellAmount} ${sell.currency}`,
        buy: `${buyAmount} ${buy.currency}`,
      },
    })
  }

  return (
    <Card width={'35vw'}>
      <div className="flex h-16 w-full items-center justify-between border-b px-8">
        <p className="font-workSans text-blue1">Exchange Currency</p>
        <CurrentExchangeIcons buy={buy} sell={sell} currencies={CURRENCIES} />
      </div>

      <div className="px-8">
        <div className="flex justify-between">
          <div>
            <div className="py-2 font-workSans">
              <a className="text-gray1">Sell</a>
              <CurrencyDropdown
                name={'Select'}
                options={CURRENCIES}
                selected={sell}
                setSelected={setSell}
              />
            </div>
            <div>
              <input
                type="text"
                className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
              />
            </div>
          </div>

          <img src={ExchangeIcon} className="mx-2 mb-3 flex self-end" />

          <div>
            <div className="py-2 font-workSans">
              <a className="text-gray1">Buy</a>
              <CurrencyDropdown
                name={'Select'}
                options={CURRENCIES}
                selected={buy}
                setSelected={setBuy}
              />
            </div>
            <div>
              <input
                type="text"
                className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="pb-6">
          <button
            type="button"
            className={`hover:bg-blue2' mt-6 w-full rounded-lg bg-blue1 py-3 font-workSans font-medium text-white hover:bg-blue2`}
            // disabled={!(parseFloat(amount) > 0 && currency !== '')}
            onClick={handleExchange}
          >
            Exchange
          </button>
        </div>

        <div className="font-workSans text-black1">
          <div className="flex justify-between">
            <div className="text-xs">Exchange Rate</div>
            <div className="text-xs font-bold">1 SGD = 10615.81 IDR</div>
          </div>
          <div className="flex justify-between pt-2 pb-6">
            <div className="text-xs">Minimum Received</div>
            <div className="text-xs">----</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Exchange
