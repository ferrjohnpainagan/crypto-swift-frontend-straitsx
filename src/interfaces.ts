export interface DropdownInterface {
  name: string
  options: any
  selected: any
  setSelected: any
}

export interface BankAccountInterface {
  account_holder_name: string
  account_no: string
  bank_abbrev: string
  bank_id: number
  disabled: boolean
  id: number
  updated_at: string
  verification_status: string
  verified: boolean
}

export interface CashInInterface {
  username: string
  customerId: string
  bankAccountNumber: string
  amount: string
}

export interface CashInSubmitInterface {
  amount: string
}

export interface CashOutInterface {
  username: string
  customerId: string
  bankAccountNumber: string
  amount: string
}

export interface CheckBalanceInterface {
  amount: string
  balanceObject: any
  currency: string
}
