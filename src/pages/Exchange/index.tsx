import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import NumberFormat from 'react-number-format'
import { useCurrencyAPI } from 'hooks/useCurrencyAPI'
import { useXaveAPI } from 'hooks/useXaveAPI'
import Card from 'components/Card'
import CurrencyDropdown from './CurrencyDropdown'
import { CURRENCIES } from 'constants/index'
import CurrentExchangeIcons from './CurrentExchangeIcons'
import ExchangeIcon from '../../assets/exchange.svg'
import Status from 'components/Status'
import Loader from 'components/Loader'
import { calcExchangeRate } from 'utils/exchangeRate'

const Exchange = () => {
  const [sell, setSell] = useState({ currency: 'SGD' })
  const [buy, setBuy] = useState({ currency: 'IDR' })
  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [status, setStatus] = useState('pending')
  const [exchangeRate, setExchangeRate] = useState(
    calcExchangeRate('SGD', 'IDR'),
  )
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { getExchangeRate } = useCurrencyAPI()
  const { processExchange } = useXaveAPI()

  const handleExchange = async () => {
    setLoading(true)
    const amountToWei = ethers.utils.parseUnits(sellAmount, 6)
    const amount = ethers.utils.formatUnits(amountToWei, 'wei')
    try {
      const response = await processExchange(Number(amount))
      const txHash = `https://polygonscan.com/tx/${response.data.data.transactionHash}`

      if (response.status === 200) {
        setStatus('success')
        setTimeout(() => {
          navigate('/remit/success/exchange', {
            state: {
              sell: `${sellAmount} ${sell.currency}`,
              buy: `${buyAmount} ${buy.currency}`,
              txHash: txHash,
            },
          })
        }, 1000)
      }
      console.log(response)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleInputChange = (type: string, input: string) => {
    let calculatedAmount
    let rate
    rate = calcExchangeRate(sell.currency, buy.currency).toString()
    setExchangeRate(rate)
    if (type === 'sell') {
      setSellAmount(input)
      calculatedAmount =
        parseFloat(input) * parseFloat(rate)
          ? (parseFloat(input) * parseFloat(rate)).toString()
          : ''
      setBuyAmount(calculatedAmount)
    } else {
      setBuyAmount(input)
      /**
       * Rate is calculated differently when the buy input is being changed
       * to correctly handle conversion
       */
      rate = calcExchangeRate(buy.currency, sell.currency)
      calculatedAmount =
        parseFloat(input) * parseFloat(rate)
          ? (parseFloat(input) * parseFloat(rate)).toString()
          : ''
      setSellAmount(calculatedAmount)
    }
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
              <NumberFormat
                className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                value={sellAmount}
                thousandSeparator={true}
                suffix={` ${sell.currency}`}
                onValueChange={(input) => {
                  handleInputChange('sell', input.value)
                }}
              />
              {/* <input
                type="text"
                className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                value={sellAmount}
                onChange={(e) => {
                  handleInputChange('sell', e.target.value)
                }}
              /> */}
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
              <NumberFormat
                className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                value={buyAmount}
                thousandSeparator={true}
                suffix={` ${buy.currency}`}
                onValueChange={(input) => {
                  handleInputChange('buy', input.value)
                }}
              />
              {/* <input
                type="text"
                className="h-16 w-full rounded-xl bg-vanilla1 px-3 text-center text-xl"
                value={buyAmount}
                onChange={(e) => {
                  handleInputChange('buy', e.target.value)
                }}
              /> */}
            </div>
          </div>
        </div>

        <div className="pb-6">
          <button
            type="button"
            className={`mt-6 flex w-full justify-center rounded-lg bg-blue1 py-3 font-workSans font-medium text-white ${
              loading ? 'opacity-50' : 'hover:bg-blue2'
            }`}
            disabled={loading}
            onClick={handleExchange}
          >
            {loading ? <Loader /> : 'Exchange'}
          </button>
        </div>

        <div className="font-workSans text-black1">
          <div className="flex justify-between">
            <div className="text-xs">Exchange Rate</div>
            <div className="text-xs font-bold">
              1 {sell.currency} = {exchangeRate} {buy.currency}
            </div>
          </div>
          <div className="flex justify-between pt-2 pb-6">
            <div className="text-xs">Status</div>
            <Status status={status} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Exchange
