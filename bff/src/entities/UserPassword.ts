import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class UserPassword extends BaseEntity {
  //User.id
  @PrimaryColumn()
  userId: string

  @Column({
    nullable: true
  })
  hashedPassword: string
}

export default UserPassword
