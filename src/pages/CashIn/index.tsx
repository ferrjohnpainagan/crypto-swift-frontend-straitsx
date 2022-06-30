import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useXaveAPI } from 'hooks/useXaveAPI'

import Dropdown from 'components/Dropdown'
import Card from 'components/Card'
import { CURRENCIES } from 'constants/index'

const CashIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const { isLoggedIn } = useSelector((state: any) => state.account)
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const [amount, setAmount] = useState('0.0')
  const [currency, setCurrency] = useState<any>('')

  useEffect(() => {
    if (isLoggedIn == 'true') return
    navigate('/remit/bank-login')
  }, [])

  // const { bankAccount, customer }: any = location.state
  const { getCustomerBankAccount } = useXaveAPI()

  const handleGetCustomerBankAccount = async () => {
    // const result = await getCustomerBankAccount(
    //   customer.data.id,
    //   bankAccount[0].account_no,
    // )
    const result = await getCustomerBankAccount(
      'customer_profile_39e7a1f4-5d1c-45e0-b483-f35b1c88b061',
      '1009248692',
    )
    console.log(result)
  }

  const handleCashIn = () => {
    navigate('/remit/success/cash-in', {
      state: { amount: amount, currency: currency },
    })
  }

  useEffect(() => {
    handleGetCustomerBankAccount()
  }, [])
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
            className={`mt-6 w-full rounded-lg ${
              parseFloat(amount) > 0 && currency !== ''
                ? 'bg-blue1 hover:bg-blue2'
                : 'bg-gray1'
            }  py-3 font-workSans font-medium text-white`}
            disabled={!(parseFloat(amount) > 0 && currency !== '')}
            onClick={handleCashIn}
          >
            Cash-in
          </button>
        </div>
      </div>
      <div className="px-8 font-workSans text-black1">
        <div className="flex justify-between">
          <div className="text-xs">Deposited amount</div>
          <div className="text-xs">----</div>
        </div>
        <div className="flex justify-between pt-2 pb-6">
          <div className="text-xs">Status</div>
          <div className="text-xs">----</div>
        </div>
      </div>
    </Card>
  )
}

export default CashIn