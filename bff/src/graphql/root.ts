import User from 'src/entities/User'

const root: {
  [key: string]: any
} = {
  hello: () => {
    console.log(`hello`)
    return 'Hello world!'
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
