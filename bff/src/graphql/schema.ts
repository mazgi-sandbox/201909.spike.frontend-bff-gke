import { buildSchema } from 'graphql'

const schema = buildSchema(`
type User {
  id: Int!
  name: String!,
  displayName: String,
  email: String!
},

type Query {
  hello: String,
  users: [User]
},

type Mutation {
  createUser(name: String!, displayName: String, email: String!): User,
}
`)

export default schema
