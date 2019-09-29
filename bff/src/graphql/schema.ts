import { buildSchema } from 'graphql'

const schema = buildSchema(`
type GCPProject {
  id: String!,
  projectId: String!,
  projectName: String!,
  description: String,
  syncStatus: Int,
}

type ObjectStorage {
  id: String!,
  type: String!,
  location: String!,
  name: String!,
  description: String,
  syncStatus: Int,
}

type VirtualMachine {
  id: String!,
  type: String!,
  location: String!,
  name: String!,
  description: String,
  syncStatus: Int,
}

type User {
  id: String!,
  name: String!,
  displayName: String,
  email: String!,
  token: String,
},

type Query {
  currentUser: User,
  hello: String,
  gcpProjects: [GCPProject],
  objectStorages: [ObjectStorage],
  virtualMachines: [VirtualMachine],
  users: [User],
},

type Mutation {
  signInLocal(
    email: String!,
    password: String,
  ): User,

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

  createVirtualMachine(
    type: String!,
    location: String!,
    name: String!,
    description: String,
  ): VirtualMachine,

  createUser(
    name: String!,
    displayName: String,
    email: String!,
  ): User,
}
`)

export default schema
