import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'
import graphqlHTTP from 'express-graphql'
import logger from 'morgan'
import root from './graphql/root'
import schema from './graphql/schema'

const isDev = 'development' == process.env.NODE_ENV
const enableGraphiql = isDev

// Create Express server
const app = express()
if (isDev) {
  app.use(logger('dev'))
}
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: enableGraphiql
  })
)

// GitHub OAuth
const clientId = process.env.BFF_OAUTH_GITHUB_CLIENT_ID || ''
const clientSecret = process.env.BFF_OAUTH_GITHUB_CLIENT_SECRET || ''
app.get(`/github-oauth/start`, async (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`
  res.status(200).send(`please access to: ${url}`)
})

app.get(`/github-oauth/redirect`, async (req, res) => {
  const code = req.query.code
  const endpointAccessToken =
    `https://github.com/login/oauth/access_token` +
    `?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
  const fetchOptsAccessToken = {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' }
  }
  const responseAccessToken = await fetch(
    endpointAccessToken,
    fetchOptsAccessToken
  )
  const responseAccessTokenJson = await responseAccessToken.json()
  console.log(
    `responseAccessTokenJson: ${JSON.stringify(
      responseAccessTokenJson,
      null,
      2
    )}`
  )
  const accessToken = await responseAccessTokenJson['access_token']
  console.log(`accessToken: ${accessToken}`)

  const endpointUser = `https://api.github.com/user`
  const fetchOptsUser = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: `token ${accessToken}`
    }
  }
  const responseUser = await fetch(endpointUser, fetchOptsUser)
  const responseUserJson = await responseUser.json()
  console.log(`responseUserJson: ${JSON.stringify(responseUserJson, null, 2)}`)

  const githubLoginName = responseUserJson['login']
  res.status(200).send(`Hi, ${githubLoginName}!`)
})

export default app
