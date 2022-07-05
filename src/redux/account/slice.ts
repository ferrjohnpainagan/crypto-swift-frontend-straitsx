import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { BankAccountInterface } from '../../interfaces'

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    SET_BANK_AUTHENTICATION: (state: any, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    SET_BANK_ACCOUNT_DETAILS: (
      state: any,
      action: PayloadAction<BankAccountInterface>,
    ) => {
      state.bankAccount = action.payload
    },
  },
})

export default accountSlice
