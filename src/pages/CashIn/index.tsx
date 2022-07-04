import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useXaveAPI } from 'hooks/useXaveAPI'

import Dropdown from 'components/Dropdown'
import Card from 'components/Card'
import { CURRENCIES } from 'constants/index'
import Loader from 'components/Loader'
import Status from 'components/Status'

const CashIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const { isLoggedIn } = useSelector((state: any) => state.account)
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const accountNumber = localStorage.getItem('accountNumber')
  const customerId = localStorage.getItem('customerId')
  const username = localStorage.getItem('username')
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('0.0')
  const [currency, setCurrency] = useState<any>('')
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    if (isLoggedIn == 'true') return
    navigate('/remit/bank-login')
  }, [])

  const { processCashIn } = useXaveAPI()

  const handleCashIn = async () => {
    setLoading(true)
    try {
      const response = await processCashIn({
        username: username,
        customerId: customerId,
        bankAccountNumber: accountNumber,
        amount: amount,
      })

      if (response.status === 200) {
        setStatus('success')
        setTimeout(() => {
          navigate('/remit/success/cash-in', {
            state: { amount: amount, currency: currency },
          })
        }, 1500)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {}, [])
  return (
    <Card width={'35vw'}>
      <div className="flex h-16 w-full items-center border-b pl-8">
        <p className="font-workSans text-blue1">Cash-in</p>
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
            <div className="flex flex-col">
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
            </div>
          </div>
          <button
            type="button"
            className={`mt-6 flex h-12 w-full justify-center rounded-lg ${
              (parseFloat(amount) > 0 && currency !== '') || loading
                ? 'bg-blue1 hover:bg-blue2'
                : 'bg-gray1'
            }  py-3 font-workSans font-medium text-white`}
            disabled={!(parseFloat(amount) > 0 && currency !== '') || loading}
            onClick={handleCashIn}
          >
            {loading ? <Loader /> : 'Cash-in'}
          </button>
        </div>
      </div>
      <div className="px-8 font-workSans text-black1">
        <div className="flex justify-between">
          <div className="text-xs">Deposited amount</div>
          <div className="text-xs font-semibold">
            {status === 'success' ? `${amount} ${currency.currency}` : '----'}
          </div>
        </div>
        <div className="flex justify-between pt-2 pb-6">
          <div className="text-xs">Status</div>
          <Status status={status} />
        </div>
      </div>
    </Card>
  )
}

export default CashIn
