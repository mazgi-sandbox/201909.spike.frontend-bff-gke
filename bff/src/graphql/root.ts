import { GCPProject, ObjectStorage, User } from 'src/entities'

import { Storage } from '@google-cloud/storage'
import * as fs from 'fs'
const rawCredential = fs.readFileSync(
  `${process.cwd()}/credentials/gcp-credentials.json`,
  'utf8'
)
const credentials = JSON.parse(rawCredential)

const root: {
  [key: string]: any
} = {
  hello: (args, request) => {
    console.log(`hello`)
    console.log(`args: ${JSON.stringify(args)}`)
    console.log(`request.ip: ${request.ip}`)
    console.log(`request.body: ${request.body}`)
    return 'Hello world!'
  },
  gcpProjects: async () => {
    const GCPProjects = await GCPProject.find()
    console.log(`users: ${JSON.stringify(GCPProjects)}`)
    return GCPProjects
  },
  registerGCPProject: async ({ projectId, description }) => {
    console.log(`GCPProject: ${projectId}, ${description}`)
    const project = new GCPProject()
    //TODO: validation
    project.projectId = projectId
    project.projectName = projectId
    project.description = description
    //TODO: read the GCP project
    await project.save()
    return project
  },
  objectStorages: async () => {
    const objectStorages = await ObjectStorage.find()
    console.log(`users: ${JSON.stringify(objectStorages)}`)
    return objectStorages
  },
  createObjectStorage: async ({ type, location, name, description }) => {
    console.log(`createObjectStorage: ${type}, ${location}, ${name}`)
    const projects = await GCPProject.find({ id: 1 })
    console.log(`GCP projects: ${projects}`)
    const project = projects[0]
    console.log(`GCP project: ${project}`)
    const projectId = project.projectId
    console.log(`GCP project: ID: ${projectId}`)

    const objectStorage = new ObjectStorage()
    objectStorage.type = type
    objectStorage.location = location
    objectStorage.name = name
    objectStorage.description = description

    //TODO: create resource
    console.log(`credential: ${JSON.stringify(credentials)}`)
    const storage = new Storage({
      projectId: projectId,
      credentials: credentials
    })
    storage
      .createBucket(objectStorage.name)
      .then(() => {
        console.log(`Bucket ${objectStorage.name} created.`)
      })
      .catch(err => {
        console.error('ERROR:', err)
      })
    console.log(`Bucket ${objectStorage.name} created.`)

    //TODO: validation
    await objectStorage.save()
    return objectStorage
  },
  users: async () => {
    const users = await User.find()
    console.log(`users: ${JSON.stringify(users)}`)
    return users
  },
  createUser: async ({ name, displayName, email }) => {
    console.log(
      `createUser: name: ${name}, displayName: ${displayName}, email: ${email}`
    )
    const user = new User()
    //TODO: validation
    user.name = name
    user.displayName = displayName
    user.email = email
    await user.save()
    return user
  }
}

export default root
