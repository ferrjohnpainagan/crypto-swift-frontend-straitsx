import React, { useState } from 'react'
import Card from 'components/Card'
import CurrencyDropdown from './CurrencyDropdown'
import { CURRENCIES } from 'constants/index'

const Wallet = () => {
  const [currency, setCurrency] = useState<any>(CURRENCIES[0])

  return (
    <Card width={'35vw'}>
      <div className="my-4 flex flex-col items-center">
        <div className="font-workSans text-xl">Your Total Balance is</div>

        <div className="flex">
          <div className="mx-3 font-workSans text-3xl text-blue1">
            $40,255.50
          </div>
          <CurrencyDropdown
            name={currency}
            options={CURRENCIES}
            selected={currency}
            setSelected={setCurrency}
          />
        </div>

        <div>Pie Chart</div>

        <div>
          <div>SGD</div>
          <div>IDR</div>
          <div>USD</div>
        </div>
      </div>
    </Card>
  )
}

export default Wallet
