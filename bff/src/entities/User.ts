/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 160,
    unique: true
  })
  public name: string = ''

  @Column({
    type: 'varchar',
    length: 160,
    unique: false,
    nullable: true
  })
  public displayName: string = ''

  @Column({
    type: 'varchar',
    length: 160,
    unique: true
  })
  public email: string = ''
}

export default User
