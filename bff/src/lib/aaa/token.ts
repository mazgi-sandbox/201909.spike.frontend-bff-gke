import * as fs from 'fs'
import { User } from 'src/entities'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const isDev = 'development' == process.env.NODE_ENV

const jwtPrivateKey = fs.readFileSync(
  `${process.cwd()}/credentials/jwt.key.pem`,
  'utf8'
)
const jwtPublicKey = fs.readFileSync(
  `${process.cwd()}/credentials/jwt.pubkey.pem`,
  'utf8'
)

export const generateToken: (user: User) => string = user => {
  const payload = {
    email: user.email
  }
  const generated = jwt.sign(payload, jwtPrivateKey, {
    expiresIn: '24h',
    algorithm: 'RS256'
  })
  return generated
}

export const verifyToken: (token: string) => any = token => {
  if (validator.isEmpty(token)) {
    const error = new Error('Token is empty.')
    throw error
  }
  const decoded = jwt.verify(token, jwtPublicKey)
  console.log(`The token verified: decoded => ${JSON.stringify(decoded)}`)
  return decoded
}
