import { generateToken, verifyToken } from './token'
import { User } from 'src/entities'
import { getRepository } from 'typeorm'

const isDev = 'development' == process.env.NODE_ENV

export const authenticateLocal: (
  email: string,
  password: string
) => Promise<User> = async (email, password) => {
  const maskedPassword = isDev ? password : '********'
  console.log(
    `signIn: ${JSON.stringify({
      email,
      maskedPassword
    })}`
  )
  // find the user with email
  const repository = getRepository(User)
  const user = await repository.findOne({
    where: [{ email: email }]
  })
  if (!user) {
    // replace the error for concealing the real db structure and query.
    const error = new Error(`Cannot found the user.`)
    throw error
  }
  console.log(`Found the user: ${JSON.stringify(user)}`)

  if (user.comparePassword(password)) {
    const newToken = generateToken(user)
    user.sessionToken = newToken
    return user
  }
  throw new Error('Cannot sign in.')
}

export const authenticatedUserByToken: (
  token: string
) => Promise<User> = async token => {
  // decode and verify the token
  const decoded = verifyToken(token)

  // find the user by token
  const email = decoded.email
  console.log(`Find the user by token: email => ${email}`)
  const repository = getRepository(User)
  const user = await repository.findOne({
    where: [{ email }]
  })
  //TODO:

  // generate and return new token
  const newToken = generateToken(user)
  user.sessionToken = newToken
  return user
}

export const authenticatedUser: (
  request: Request
) => Promise<User> = async request => {
  if (isDev) {
    console.log(`request.headers: ${JSON.stringify(request.headers, null, 2)}`)
  }
  const token = request.headers['x-auth-jwt']
  console.log(`token: ${token}`)
  const user = await authenticatedUserByToken(token)
  console.log(`authenticatedUser: ${JSON.stringify(user)}`)
  return user
}
