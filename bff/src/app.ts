import cors from 'cors'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import root from './graphql/root'
import schema from './graphql/schema'

const enableGraphiql = true

// Create Express server
const app = express()
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
