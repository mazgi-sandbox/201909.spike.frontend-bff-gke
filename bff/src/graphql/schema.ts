import { buildSchema } from 'graphql'

const schema = buildSchema(`
type GCPProject {
  id: Int!,
  projectId: String!,
  projectName: String!,
  description: String,
  syncStatus: Int,
}

type ObjectStorage {
  id: Int!,
  type: String!,
  location: String!,
  name: String!,
  description: String,
  syncStatus: Int,
}

type User {
  id: Int!,
  name: String!,
  displayName: String,
  email: String!,
},

type Query {
  hello: String,
  gcpProjects: [GCPProject],
  objectStorages: [ObjectStorage],
  users: [User],
},

type Mutation {
  registerGCPProject(
    projectId: String!,
    description: String,
  ): GCPProject,

  createObjectStorage(
    type: String!,
    location: String!,
    name: String!,
    description: String,
  ): ObjectStorage,

  createUser(
    name: String!,
    displayName: String,
    email: String!,
  ): User,
}
`)

export default schema
