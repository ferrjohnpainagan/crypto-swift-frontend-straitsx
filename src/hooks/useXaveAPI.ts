import { useCallback } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const { REACT_APP_SERVERLESS_STAGE_URL, REACT_APP_XAVE_API_URL } = process.env

export function useXaveAPI(): any {
  /**
   * Mock linking of Bank account
   */
  const linkBankAccount = useCallback(async () => {
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${REACT_APP_XAVE_API_URL}/${REACT_APP_SERVERLESS_STAGE_URL}/customer_bank_account`,
      data: {
        customerName: 'John Ng',
        registrationType: 'personal',
        registrationId: 'S1234567J',
        countryOfResidence: 'singapore',
        dateOfBirth: '1983-11-14',
        nationality: 'SINGAPOREAN',
        accountHolderName: 'John Ng',
        accountNumber: '1009244244',
        bank: 'CIMB',
        gender: 'MALE',
        email: 'test@gmail.com',
        phoneNo: '+6587654321',
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
  }, [])

  return { linkBankAccount }
}
