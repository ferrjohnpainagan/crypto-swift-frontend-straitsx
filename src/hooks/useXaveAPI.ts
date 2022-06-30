import { useCallback } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CashInInterface } from 'interfaces'

const { REACT_APP_SERVERLESS_STAGE_URL, REACT_APP_XAVE_API_URL } = process.env

const baseUrl = `${REACT_APP_XAVE_API_URL}/${REACT_APP_SERVERLESS_STAGE_URL}`

export function useXaveAPI(): any {
  /**
   * Mock linking of Bank account
   */
  const linkBankAccount = useCallback(async () => {
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}/create_customer_bank_account`,
      data: {
        customerName: 'Johnn Ng',
        registrationType: 'personal',
        registrationId: `S123${Math.floor(1000 + Math.random() * 9000)}J`,
        countryOfResidence: 'singapore',
        dateOfBirth: '1983-11-14',
        nationality: 'SINGAPOREAN',
        accountHolderName: 'Johnn Ng',
        accountNumber: `100924${Math.floor(1000 + Math.random() * 9000)}`,
        bank: 'CIMB',
        gender: 'MALE',
        email: 'test1@gmail.com',
        phoneNo: '+6587654321',
        currency: 'SGD',
        username: 'username',
        password: 'password',
      },
      headers: {
        // accept: '*/*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    }

    try {
      const res: AxiosResponse = await axios(request)
      return { res, username: 'username' }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }, [])

  const getCustomerBankAccount = useCallback(
    async (customerId: string, bankAccountNumber: string) => {
      const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${baseUrl}/get_customer_bank_account/${customerId}/${bankAccountNumber}`,
      }

      try {
        const res: AxiosResponse = await axios(request)
        return res
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    [],
  )

  const processCashIn = useCallback(async (data: CashInInterface) => {
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}/cash_in`,
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

  return { linkBankAccount, getCustomerBankAccount, processCashIn }
}
