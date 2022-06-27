import { Dispatch } from 'redux'
import { BankAccountInterface } from 'interfaces'

import accountSlice from './slice'

export const authenticateBank =
  (status: boolean) => async (dispatch: Dispatch) => {
    dispatch(accountSlice.actions.SET_BANK_AUTHENTICATION(status))
  }

export const setBankDetails =
  (data: BankAccountInterface) => async (dispatch: Dispatch) => {
    dispatch(accountSlice.actions.SET_BANK_ACCOUNT_DETAILS(data))
  }
