import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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
}

export default User
