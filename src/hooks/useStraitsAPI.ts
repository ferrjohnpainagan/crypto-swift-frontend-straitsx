import { useCallback } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const { REACT_APP_SERVERLESS_STAGE_URL, REACT_APP_XAVE_API_URL } = process.env

const baseUrl = `${REACT_APP_XAVE_API_URL}/${REACT_APP_SERVERLESS_STAGE_URL}`

export function useStraitsAPI(): any {
  const processCashInStraits = useCallback(async (data) => {
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}/create_bank_transfer_payment`,
      data,
    }

    try {
      const res: AxiosResponse = await axios(request)
      return res
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }, [])

  const processCashOutStraits = useCallback(async (data) => {
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}/create_bank_transfer_payout`,
      data,
    }

    try {
      const res: AxiosResponse = await axios(request)
      return res
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }, [])

  return {
    processCashInStraits,
    processCashOutStraits,
  }
}
