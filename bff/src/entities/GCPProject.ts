import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum GCPProjectSyncStatus {
  APP_UPDATED = 1 << 0,
  PLATFORM_UPDATED = 1 << 2,
  PLATFORM_MAINTENANCE = 1 << 4,
  APP_ERRORED = 1 << 5,
  PLATFORM_ERRORED = 1 << 6
}

@Entity()
export class GCPProject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  projectId: string

  @Column()
  projectName: string

  @Column({
    type: 'text',
    nullable: true
  })
  description: string

  @Column({
    type: 'integer',
    default: GCPProjectSyncStatus.APP_UPDATED
  })
  syncStatus: GCPProjectSyncStatus

  resetSyncStatus: () => void = () => {
    this.syncStatus = 0
  }
}

export default GCPProject
