import { exchangeValues } from 'constants/index'

export const calcExchangeRate = (
  baseCurrency: string,
  resultingCurrency: string,
) => {
  switch (true) {
    case baseCurrency === 'xSGD' && resultingCurrency === 'xIDR':
      return exchangeValues.SGD_TO_IDR.toFixed(2)
    case baseCurrency === 'USD' && resultingCurrency === 'SGD':
      return exchangeValues.USD_TO_SGD.toFixed(2)
    case baseCurrency === 'USD' && resultingCurrency === 'IDR':
      return exchangeValues.USD_TO_IDR.toFixed(2)
    case baseCurrency === 'SGD' && resultingCurrency === 'USD':
      return 1 / exchangeValues.USD_TO_SGD
    case baseCurrency === 'xIDR' && resultingCurrency === 'xSGD':
      return 1 / exchangeValues.SGD_TO_IDR
    case baseCurrency === 'IDR' && resultingCurrency === 'USD':
      return 1 / exchangeValues.USD_TO_IDR
    case baseCurrency === resultingCurrency:
      return 1
    default:
      return 0
  }
}
