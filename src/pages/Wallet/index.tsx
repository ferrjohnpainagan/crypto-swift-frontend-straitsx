import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HSBar from 'react-horizontal-stacked-bar-chart'
import { useXaveAPI } from 'hooks/useXaveAPI'
import currencyFormatter from 'currency-formatter'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

import Card from 'components/Card'
import PieChart from './PieChart'
import CurrencyDropdown from './CurrencyDropdown'
import { CURRENCIES } from 'constants/index'
import Loader from 'components/Loader'

const Wallet = () => {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const mockWalletId = localStorage.getItem('mockWalletId')
  const [currency, setCurrency] = useState<any>(CURRENCIES[0])
  const [labels, setLabels] = useState([])
  const [balanceList, setBalanceList] = useState([])
  const [balanceData, setBalanceData] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [exchangeRate, setExchangeRate] = useState('0')
  const [loading, setLoading] = useState(false)
  const [usdRate, setUsdRate] = useState({
    sgd: 1.39,
    idr: 15044.3,
  })

  useEffect(() => {
    if (isLoggedIn == 'true') return
    navigate('/error', {
      state: {
        message:
          'You are not yet logged in. Please login first to access this page.',
      },
    })
  }, [])

  const data = {
    labels: labels,
    datasets: [
      {
        data: balanceList,
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

  const { getCryptoWalletBalance, viewStablecoinSwap, getMockWallet } =
    useXaveAPI()

  useEffect(() => {
    handleGetWalletBalance(CURRENCIES[0])
    handleMockWalletBalance()
  }, [])

  const handleGetWalletBalance = async (walletCurrency) => {
    setLoading(true)
    // const exchangeRate = await handleExchangeRate()
    // const response = await getCryptoWalletBalance()
    const response = await getMockWallet(mockWalletId)
    const walletBalance = {
      xSGD: response.sgdBalance,
      xIDR: response.idrBalance,
    }
    const entries = Object.entries(walletBalance)
    console.log(entries)
    let currencies: any = []
    let balances: any = []
    let balanceDataList: any = []
    let totalWalletBalance = 0
    let amount: any
    let color: any

    for (const [symbol, balance] of entries as any) {
      for (let i = 0; i < CURRENCIES.length; i++) {
        if (symbol === CURRENCIES[i].stableCoin) {
          amount = new BigNumber(balance as string)
          // amount = new BigNumber(balance as string)
          //   .div(CURRENCIES[i].conversionFactor ** 2)
          //   .toFixed(2)
          //   .toString()
          // amount = new BigNumber(balance as string).div(10 ** 6).toString()

          // if (symbol !== walletCurrency.stableCoin) {
          //   if (symbol === 'xSGD') {
          //     amount = parseFloat(amount) * parseFloat(exchangeRate)
          //   } else {
          //     amount = parseFloat(amount) / parseFloat(exchangeRate)
          //   }
          // }

          if (symbol === 'xSGD') {
            amount = parseFloat(amount) / usdRate.sgd
          } else {
            amount = parseFloat(amount) / usdRate.idr
          }

          balances.push(amount)

          CURRENCIES.map((currency) => {
            if (currency.stableCoin === symbol) {
              color = currency.color
              currencies.push(CURRENCIES[i].currency)
            }
          })

          totalWalletBalance += parseFloat(amount)

          balanceDataList.push({
            value: parseFloat(amount),
            description:
              symbol === 'xIDR'
                ? `${currencyFormatter.format(
                    parseInt(
                      balance,
                      // new BigNumber(balance as string).div(10 ** 7).toString(),
                    ),
                    {
                      symbol: `${CURRENCIES[i].currency}`,
                      format: '%v %s',
                    },
                  )}`
                : `${currencyFormatter.format(
                    parseFloat(
                      balance,
                      // new BigNumber(balance as string).div(10 ** 6).toString(),
                    ),
                    {
                      symbol: CURRENCIES[i].currency,
                      format: '%v %s',
                    },
                  )}`,

            color: color,
          })
        }
      }
    }

    setLabels(currencies)
    setBalanceList(balances)
    setBalanceData(balanceDataList)
    setTotalBalance(totalWalletBalance)
    setLoading(false)
  }

  const handleSelectCurrency = (currency) => {
    setCurrency(currency)
    handleGetWalletBalance(currency)
  }

  const handleExchangeRate = async () => {
    const amountToWei = ethers.utils.parseUnits('1', 6)
    const amount = ethers.utils.formatUnits(amountToWei, 'wei')
    const response = await viewStablecoinSwap(amount)

    const rate = new BigNumber(response.data.data.rate)
      .div(10 ** 6)
      .toFixed(2)
      .toString()

    // setExchangeRate(rate)
    return rate
  }

  const handleMockWalletBalance = async () => {
    const response = await getMockWallet(mockWalletId)
    console.log(response)
  }

  return (
    <Card width={'50vw'}>
      <div style={{ height: '550px' }}>
        <div className="flex justify-center">
          <div className="my-4 flex flex-col justify-start px-8">
            <div className="font-workSans text-xl">Your Total Balance is</div>

            <div className="mt-2 flex font-workSans text-3xl text-blue1">
              {loading ? (
                <div className="text-black">
                  <Loader />
                </div>
              ) : (
                currencyFormatter.format(totalBalance, {
                  symbol: 'USD',
                  format: '%v %s',
                })
              )}
            </div>

            <div className="mt-1">
              {/* <CurrencyDropdown
                name={currency}
                options={CURRENCIES}
                selected={currency}
                setSelected={handleSelectCurrency}
              /> */}
            </div>
          </div>
          <div>
            {loading ? (
              <div
                style={{ width: '300px', height: '300px' }}
                className="flex items-center justify-center"
              >
                <Loader />
              </div>
            ) : (
              <PieChart data={data} options={options} />
            )}
          </div>
        </div>
        <div className="px-6 pb-6">
          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <HSBar showTextDown={true} id="hsbarExample" data={balanceData} />
          )}
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
      </div>
    </Card>
  )
}

export default Wallet
