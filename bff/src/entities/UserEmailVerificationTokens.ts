import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserEmailVerificationTokens extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  //User.id
  @Column()
  userId: string

  @Column()
  encryptedToken: string
}

export default UserEmailVerificationTokens
