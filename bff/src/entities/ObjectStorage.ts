import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum ObjectStorageType {
  LOCAL = 'local',
  AMAZON_S3 = 'amazon-s3',
  GOOGLE_CLOUD_STORAGE = 'google-cloud-storage'
}

export enum ObjectStorageSyncStatus {
  APP_UPDATED = 1 << 0,
  PLATFORM_UPDATED = 1 << 2,
  PLATFORM_MAINTENANCE = 1 << 4,
  APP_ERRORED = 1 << 5,
  PLATFORM_ERRORED = 1 << 6
}

@Entity('object_storages')
export class ObjectStorage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: ObjectStorageType
  })
  type: ObjectStorageType

  @Column()
  location: string

  @Column({
    type: 'varchar',
    length: 240,
    unique: true
  })
  name: string

  @Column({
    type: 'text',
    nullable: true
  })
  description: string

  @Column({
    type: 'integer',
    default: ObjectStorageSyncStatus.APP_UPDATED
  })
  syncStatus: ObjectStorageSyncStatus

  resetSyncStatus: () => void = () => {
    this.syncStatus = 0
  }
}

export default ObjectStorage
