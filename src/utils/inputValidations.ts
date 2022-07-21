export const isInputZero = (input: string) => {
  return input == '0' || input == '0.0' || input == '0.00'
}

export const isBalanceEnough = (balance, inputValue) => {
  return parseFloat(balance) >= parseFloat(inputValue)
}
