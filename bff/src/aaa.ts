import * as fs from 'fs'
import { User } from 'src/entities'
import { getManager } from 'typeorm'
import jwt from 'jsonwebtoken'

const isDev = 'development' == process.env.NODE_ENV

const jwtPrivateKey = fs.readFileSync(
  `${process.cwd()}/credentials/jwt.id_rsa`,
  'utf8'
)
const jwtPublicKey = fs.readFileSync(
  `${process.cwd()}/credentials/jwt.id_rsa.pub`,
  'utf8'
)
const payload = {
  data1: 'Data 1'
}

export const authenticateLocal = async (email, password) => {
  const entityManager = getManager()
  const user = await entityManager.findOne(User, {
    where: [{ email: email }]
  })
  console.log(`Found the user: ${user}`)

  if (!!user && user.email === email && password === 'dummy') {
    return [user, null]
  } else {
    return [null, new Error('Cannot sign in.')]
  }
}

export const authenticated = async token => {
  const entityManager = getManager()
  const user = await entityManager.findOne(User, {
    where: [{ email: 'admin@localhost' }]
  })

  const newToken = jwt.sign(payload, jwtPrivateKey, {
    expiresIn: '24h'
  })
  user.token = newToken

  return [user, null]
  // return [user, new Error(`Not Impl`)]
}
