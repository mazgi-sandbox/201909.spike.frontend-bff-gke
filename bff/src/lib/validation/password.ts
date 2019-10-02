import validator from 'validator'

export const PasswordLengthBytesMin = 8
// the practical limit for Bcrypt libraries
export const PasswordLengthBytesMax = 72

export const validatePassword: (password: string) => Error[] = password => {
  const errors = []
  if (!password) {
    const e = new Error(`Password should not null or undefined.`)
    return [e]
  }
  if (validator.isEmpty(password)) {
    const e = new Error(`Password should not empty.`)
    return [e]
  }
  if (password.length < PasswordLengthBytesMin) {
    const e = new Error(
      `Password length is too short` +
        ` that must be at least ${PasswordLengthBytesMin} characters.`
    )
    errors.push(e)
  } else if (password.length > PasswordLengthBytesMax) {
    const e = new Error(
      `Password length is too long` +
        ` that must be less than or equal to ${PasswordLengthBytesMax} characters.`
    )
    errors.push(e)
  }
  if (validator.isMultibyte(password)) {
    const e = new Error(`Password should not contain multibyte chars.`)
    errors.push(e)
  }
  return errors
}
