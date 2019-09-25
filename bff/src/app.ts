import cors from 'cors'
import express from 'express'
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

export default app
