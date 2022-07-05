import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'components/Card'
import PieChart from './PieChart'
import CurrencyDropdown from './CurrencyDropdown'
import { CURRENCIES } from 'constants/index'
import HSBar from 'react-horizontal-stacked-bar-chart'

const Wallet = () => {
  const navigate = useNavigate()
  const [currency, setCurrency] = useState<any>(CURRENCIES[0])
  const data = {
    labels: ['SGD', 'IDR', 'USD'],
    datasets: [
      {
        data: [25844.03, 11030.01, 3381.46],
        backgroundColor: ['#038BF4', '#F7931A', '#10B9AF'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
    },
  }

  return (
    <Card width={'50vw'}>
      <div className="flex justify-center">
        <div className="my-4 flex flex-col justify-start px-8">
          <div className="font-workSans text-xl">Your Total Balance is</div>

          <div className="mx-3 mt-2 flex font-workSans text-3xl text-blue1">
            $40,255.50
          </div>
          <div className="mt-1">
            <CurrencyDropdown
              name={currency}
              options={CURRENCIES}
              selected={currency}
              setSelected={setCurrency}
            />
          </div>
        </div>
        <div>
          <PieChart data={data} options={options} />
        </div>
      </div>
      <div className="px-6 pb-6">
        <HSBar
          showTextDown={true}
          id="hsbarExample"
          data={[
            { value: 25844.03, description: '25844.03 SGD', color: '#038BF4' },
            { value: 11030.01, description: '11030.01 SGD', color: '#F7931A' },
            { value: 3381.46, description: '3381.46 SGD', color: '#10B9AF' },
          ]}
        />
      </div>
      <div className="flex justify-center pb-8">
        <button
          style={{ width: '20vw' }}
          type="button"
          className={`mt-6 flex w-full justify-center rounded-lg bg-blue1 py-3 font-workSans font-medium text-white hover:bg-blue2`}
          onClick={() => navigate('/remit/cash-in')}
        >
          Remit
        </button>
      </div>
    </Card>
  )
}

export default Wallet
