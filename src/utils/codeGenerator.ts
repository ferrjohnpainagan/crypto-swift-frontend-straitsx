export const randomCodeGenerator = (length: number) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ'

  const string_length = length
  let randomstringGenerator = ''

  for (let i = 0; i < string_length; i++) {
    let rnum = Math.floor(Math.random() * chars.length)
    randomstringGenerator += chars.substring(rnum, rnum + 1)
  }
  return randomstringGenerator
}
