import { useCallback } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const { REACT_APP_PLAID_GENERATE_TOKENAPI_URL } = process.env

export function usePlaidAuthAPI(): any {
  const generateLinkToken = useCallback(
    async () => {
      const request: AxiosRequestConfig = {
        method: 'POST',
        url: REACT_APP_PLAID_GENERATE_TOKENAPI_URL,
      }
      try {
        const res: AxiosResponse = await axios(request)
        console.log(res.data)
        return res.data
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    [],
  )

  return { generateLinkToken }
}