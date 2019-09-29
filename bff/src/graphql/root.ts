import * as fs from 'fs'
import { GCPProject, ObjectStorage, User, VirtualMachine } from 'src/entities'
import Compute from '@google-cloud/compute'
import { Storage } from '@google-cloud/storage'
import { authenticateLocal, authenticated } from 'src/aaa'

const isDev = 'development' == process.env.NODE_ENV

const rawCredential = fs.readFileSync(
  `${process.cwd()}/credentials/gcp-credentials.json`,
  'utf8'
)
const credentials = JSON.parse(rawCredential)

const root: {
  [key: string]: any
} = {
  signInLocal: async ({ email, password }, request) => {
    if (isDev) {
      console.log(`signIn: email => ${email}, password => ${password}`)
    }

    const [user, error] = await authenticateLocal(email, password)
    if (error) {
      throw error
    }
    return user
  },
  currentUser: async (args, request) => {
    const token = request.headers['x-auth-jwt']
    if (isDev) {
      console.log(
        `request.headers: ${JSON.stringify(request.headers, null, 2)}`
      )
      console.log(`currentUser: token => ${token}`)
    }
    const [user, error] = await authenticated(token)
    if (error) {
      throw error
    }
    return user
  },

  users: async (args, request) => {
    const users = await User.find()
    console.log(`users: ${JSON.stringify(users)}`)
    return users
  },
  createUser: async ({ name, displayName, email }, request) => {
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
  },

  hello: (args, request) => {
    console.log(`hello`)
    console.log(`args: ${JSON.stringify(args)}`)
    console.log(`request.ip: ${request.ip}`)
    console.log(`request.user: ${JSON.stringify(request.body, null, 2)}`)
    return 'Hello world!'
  },

  gcpProjects: async (args, request) => {
    const GCPProjects = await GCPProject.find()
    console.log(`gcpProjects: ${JSON.stringify(GCPProjects)}`)
    return GCPProjects
  },
  registerGCPProject: async ({ projectId, description }, request) => {
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
  objectStorages: async (args, request) => {
    const objectStorages = await ObjectStorage.find()
    console.log(`objectStorages: ${JSON.stringify(objectStorages)}`)
    return objectStorages
  },
  createObjectStorage: async (
    { type, location, name, description },
    request
  ) => {
    console.log(`createObjectStorage: ${type}, ${location}, ${name}`)
    const projects = await GCPProject.find()
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

    //TODO: validation
    await objectStorage.save()
    return objectStorage
  },
  virtualMachines: async (args, request) => {
    const virtualMachines = await VirtualMachine.find()
    console.log(`virtualMachines: ${JSON.stringify(virtualMachines)}`)
    return virtualMachines
  },
  createVirtualMachine: async (
    { type, location, name, description },
    request
  ) => {
    console.log(`createVirtualMachine: ${type}, ${location}, ${name}`)
    const projects = await GCPProject.find()
    console.log(`GCP projects: ${projects}`)
    const project = projects[0]
    console.log(`GCP project: ${project}`)
    const projectId = project.projectId
    console.log(`GCP project: ID: ${projectId}`)

    const virtualMachine = new VirtualMachine()
    virtualMachine.type = type
    virtualMachine.location = location
    virtualMachine.name = name
    virtualMachine.description = description

    //TODO: create resource
    console.log(`credential: ${JSON.stringify(credentials)}`)
    console.log(`aaa`)
    const compute = new Compute({
      projectId: projectId,
      credentials: credentials
    })
    console.log(`bbb`)
    console.log(`compute: ${JSON.stringify(compute)}`)
    const zone = compute.zone('us-central1-c')
    console.log(`zone: ${JSON.stringify(zone)}`)
    await zone
      .createVM(virtualMachine.name, {
        os: 'ubuntu'
      })
      .then(() => {
        console.log(`VM ${virtualMachine.name} created.`)
      })
      .catch(err => {
        console.error('ERROR:', err)
      })

    //TODO: validation
    await virtualMachine.save()
    return virtualMachine
  }
}

export default root
