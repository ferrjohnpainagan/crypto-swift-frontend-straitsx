import React, { useState } from 'react'

const CashIn = () => {
  const [amount, setAmount] = useState('0.0')
  return (
    <div
      style={{ width: '30vw' }}
      className="mx-32 flex flex-col rounded-xl border border-solid border-cardStroke bg-white"
    >
      <div className="flex h-16 w-full items-center border-b pl-8">
        <p className="font-workSans text-blue1">Cash-in</p>
      </div>

      <div className="flex items-center justify-between px-8 py-6">
        <div>Dropdown</div>
        <div style={{ width: '18vw' }}>
          <div className="text-md font-workSans font-semibold">Amount</div>
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
              parseFloat(amount) > 0 ? 'bg-blue1 hover:bg-blue2' : 'bg-gray1'
            }  py-3 font-workSans text-white`}
            disabled={!(parseFloat(amount) > 0)}
          >
            Deposit
          </button>
        </div>
      </div>
      <div className="px-8">
        <div className="flex justify-between">
          <div className="text-xs">Deposited amount</div>
          <div className="text-xs">----</div>
        </div>
        <div className="flex justify-between pt-2 pb-6">
          <div className="text-xs">Status</div>
          <div className="text-xs">----</div>
        </div>
      </div>
    </div>
  )
}

export default CashIn
