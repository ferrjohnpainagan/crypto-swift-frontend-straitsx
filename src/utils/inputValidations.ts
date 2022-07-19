export const isInputZero = (input: string) => {
  return input == '0' || input == '0.0' || input == '0.00'
}

export const isBalanceEnough = (balance, inputValue) => {
  console.log(balance > parseFloat(inputValue))
  return balance >= parseFloat(inputValue)
}
