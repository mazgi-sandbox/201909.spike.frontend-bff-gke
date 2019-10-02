import { User } from 'src/entities'
import { getRepository } from 'typeorm'

const loadSeedDataToUser: () => void = async () => {
  const email = process.env.BFF_ADMIN_EMAIL
  const repository = getRepository(User)
  const admin = await repository.findOne({ where: [{ email }] })
  if (admin) {
    console.log(`Admin user already exist: email => ${admin.email}`)
    return
  }
  // Create new Admin
  const newAdmin = repository.create({
    name: 'admin',
    email
  })
  await repository.save(newAdmin)
  // Set password
  const password = process.env.BFF_ADMIN_PASSWORD_PLAINTEXT
  await newAdmin.updatePassword(password)
  console.log(
    `New admin user was successfully registered: email => ${newAdmin.email}`
  )
}

export const loadSeedData: () => void = async () => {
  await loadSeedDataToUser()
}
