import Sgd from 'assets/currencies/sgd.svg'
import Idr from 'assets/currencies/idr.svg'
import Usd from 'assets/currencies/usd.svg'

export const CURRENCIES = [
  {
    currency: 'SGD',
    image: Sgd,
    stableCoin: 'xSGD',
    color: '#038BF4',
    conversionFactor: 5000,
  },
  {
    currency: 'IDR',
    image: Idr,
    stableCoin: 'xIDR',
    color: '#F7931A',
    conversionFactor: 80000,
  },
]

export const exchangeValues = {
  SGD_TO_IDR: 10747.14,
  USD_TO_SGD: 1.39,
  USD_TO_IDR: 14951.7,
}
