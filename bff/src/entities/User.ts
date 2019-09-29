import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
  email: string

  token: string
}

export default User
