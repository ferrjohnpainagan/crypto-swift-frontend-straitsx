import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { useXaveAPI } from 'hooks/useXaveAPI'
import Card from 'components/Card'
import Dropdown from 'components/Dropdown'
import Loader from 'components/Loader'
import Status from 'components/Status'
import { CURRENCIES } from 'constants/index'
import { calcExchangeRate } from 'utils/exchangeRate'

const CashOut = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const customerId = localStorage.getItem('customerId')
  const accountNumber = localStorage.getItem('accountNumber')
  const [amount, setAmount] = useState('0.0')
  const [cashOutAmount, setCashOutAmount] = useState<any>()
  const [cashOutCurrency, setCashOutCurrency] = useState('IDR')
  const [currency, setCurrency] = useState<any>(CURRENCIES[0])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('pending')
  const [exchangeRate, setExchangeRate] = useState(
    calcExchangeRate('SGD', 'IDR'),
  )

  const { processCashOut } = useXaveAPI()

  const handleCashOut = async () => {
    setLoading(true)
    const rate = exchangeRate

    try {
      const response = await processCashOut({
        username: username,
        customerId: customerId,
        bankAccountNumber: accountNumber,
        amount: amount,
      })
      console.log(response)
      if (response.status === 200) {
        setStatus('success')
        console.log(cashOutAmount)
        setTimeout(() => {
          navigate('/remit/success/cash-out', {
            state: {
              amount: amount,
              currency: currency,
              cashOutAmount: Number(amount) * Number(rate),
              cashOutCurrency: cashOutCurrency,
            },
          })
        }, 1500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card width={'35vw'}>
      <div className="flex h-16 w-full items-center border-b pl-8">
        <p className="font-workSans text-blue1">Cash-out</p>
      </div>

      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <Dropdown
            name={'Select'}
            options={CURRENCIES}
            selected={currency}
            setSelected={setCurrency}
          />
        </div>
        <div style={{ width: '18vw' }}>
          <div className="text-md font-workSans font-semibold text-black1">
            Amount
          </div>
          <div className="flex justify-between rounded-lg bg-vanilla1 p-3 align-bottom">
            {/* <div className="flex flex-col">
              <div className="font-workSans text-xs">BALANCE: 120,420</div>
              <input
                type="text"
                className="align-end mt-4 flex w-full border-none border-transparent bg-transparent font-roboto text-2xl focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex self-end">
              <button className="rounded-xl border border-blue1 p-1 text-xs text-blue1">
                MAX
              </button>
            </div> */}
            {/* <input
              type="text"
              className="align-end flex w-full border-none border-transparent bg-transparent font-roboto text-2xl focus:outline-none"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
              }}
            /> */}
            <NumberFormat
              className="align-end flex w-full border-none border-transparent bg-transparent font-roboto text-2xl focus:outline-none"
              value={amount}
              thousandSeparator={true}
              onValueChange={(input) => {
                setAmount(input.value)
              }}
            />
          </div>
          <button
            type="button"
            className={`mt-6 flex w-full justify-center rounded-lg  ${
              !(parseFloat(amount) > 0 && currency !== '') || loading
                ? 'bg-gray1 opacity-50'
                : 'bg-blue1 hover:bg-blue2'
            }  py-3 font-workSans font-medium text-white`}
            disabled={!(parseFloat(amount) > 0 && currency !== '') || loading}
            onClick={handleCashOut}
          >
            {loading ? <Loader /> : 'Cash-out'}
          </button>
        </div>
      </div>
      <div className="px-8 font-workSans text-black1">
        <div className="flex justify-between">
          <div className="text-xs">Exchange Rate</div>
          <div className="text-xs font-bold">1 SGD = {exchangeRate} IDR</div>
        </div>
        <div className="flex justify-between pt-2 pb-6">
          <div className="text-xs">Status</div>
          <Status status={status} />
        </div>
      </div>
    </Card>
  )
}

export default CashOut
