import Sgd from '../assets/currencies/sgd.svg'
import Idr from '../assets/currencies/idr.svg'

export const CURRENCIES = [
  { currency: 'SGD', image: Sgd, stableCoin: 'xSGD' },
  { currency: 'IDR', image: Idr, stableCoin: 'xIDR' },
]

export const exchangeValues = {
  SGD_TO_IDR: 10747.14,
  USD_TO_SGD: 1.39,
  USD_TO_IDR: 14951.7,
}
