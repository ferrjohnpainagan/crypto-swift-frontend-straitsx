export const randomCodeGenerator = (length: number) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const string_length = length
  let randomstringGenerator = ''

  for (let i = 0; i < string_length; i++) {
    let rnum = Math.floor(Math.random() * chars.length)
    randomstringGenerator += chars.substring(rnum, rnum + 1)
  }
  return randomstringGenerator
}

export const randomNumberGenerator = (length: number) => {
  const chars = '0123456789'

  const string_length = length
  let randomNumberGenerator = ''

  for (let i = 0; i < string_length; i++) {
    let rnum = Math.floor(Math.random() * chars.length)
    randomNumberGenerator += chars.substring(rnum, rnum + 1)
  }
  return parseInt(randomNumberGenerator)
}
