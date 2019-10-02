import * as bcrypt from 'bcrypt'
import {
  AfterInsert,
  AfterRemove,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { IsEmail, validate } from 'class-validator'
import UserPassword from './UserPassword'
import { getRepository } from 'typeorm'
import { sendMail } from 'src/lib/mail'
import { validatePassword } from 'src/lib/validation'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 160,
    unique: true
  })
  name: string

  @Column({
    type: 'varchar',
    length: 160,
    unique: false,
    nullable: true
  })
  displayName: string

  @Column({
    type: 'varchar',
    length: 160,
    unique: true
  })
  @IsEmail()
  email: string

  // volatile field
  sessionToken: string

  @AfterInsert()
  sendEmailForVerificationEmail: () => Promise<void> = async () => {
    const to = this.email
    const subject = `Confirm Your Email`
    const body = `<email body>`
    sendMail(to, subject, body)
  }

  @BeforeInsert()
  @BeforeUpdate()
  validate: () => Promise<void> = async () => {
    const errors = await validate(this)
    if (errors.length > 0) {
      throw new Error(`Validation failed. ${JSON.stringify(errors)}`)
    }
  }

  @AfterInsert()
  insertUserPassword: () => Promise<void> = async () => {
    const userPassword = new UserPassword()
    userPassword.userId = this.id
    await userPassword.save()
  }

  @AfterRemove()
  removeUserPassword: () => Promise<void> = async () => {
    const repository = getRepository(UserPassword)
    const userPassword = await repository.findOne(this.id)
    await repository.remove(userPassword)
  }

  comparePassword: (
    plainTextPassword: string
  ) => Promise<boolean> = async plainTextPassword => {
    const repository = getRepository(UserPassword)
    const userPassword = await repository.findOne(this.id)
    const match = await bcrypt.compare(
      userPassword.hashedPassword,
      plainTextPassword
    )
    return match
  }

  updatePassword: (
    plainTextPassword: string
  ) => Promise<void> = async plainTextPassword => {
    const validationErrors = validatePassword(plainTextPassword)
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed. ${JSON.stringify(validationErrors)}`)
    }
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10)
    const repository = getRepository(UserPassword)
    const userPassword = await repository.findOne(this.id)
    userPassword.hashedPassword = hashedPassword
    userPassword.save()
  }
}

export default User
