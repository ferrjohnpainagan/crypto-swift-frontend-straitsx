import { useCallback } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import moment from 'moment'

const { REACT_APP_CURRENCY_API_URL } = process.env
export function useCurrencyAPI(): any {
  const getExchangeRate = useCallback(
    async (baseCurrency: string, resultingCurrency: string) => {
      const queryParams = {
        base: baseCurrency,
        date: moment(new Date().toString()).format('YYYY-MM-DD'),
        symbols: resultingCurrency,
      }

      const queryString = new URLSearchParams(queryParams)

      const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${REACT_APP_CURRENCY_API_URL}/rates?${queryString}`,
        headers: {
          // 'Access-Control-Allow-Origin': '*',
        },
      }

      try {
        const res: AxiosResponse = await axios(request)
        console.log(res)
        return res
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    [],
  )

  return { getExchangeRate }
}
