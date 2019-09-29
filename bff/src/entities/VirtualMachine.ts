import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum VirtualMachineType {
  LOCAL = 'local',
  AMAZON_S3 = 'amazon-ec2',
  GOOGLE_CLOUD_STORAGE = 'google-compute-engine'
}

export enum VirtualMachineSyncStatus {
  APP_UPDATED = 1 << 0,
  PLATFORM_UPDATED = 1 << 2,
  PLATFORM_MAINTENANCE = 1 << 4,
  APP_ERRORED = 1 << 5,
  PLATFORM_ERRORED = 1 << 6
}

export enum VirtualMachineRunningStatus {
  STARTED,
  PAUSED,
  STOPPED,
  TERMINATED
}

@Entity()
export class VirtualMachine extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: VirtualMachineType
  })
  type: VirtualMachineType

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
    default: VirtualMachineSyncStatus.APP_UPDATED
  })
  syncStatus: VirtualMachineSyncStatus

  resetSyncStatus: () => void = () => {
    this.syncStatus = 0
  }

  @Column({
    type: 'integer',
    default: VirtualMachineRunningStatus.STARTED
  })
  runningStatus: VirtualMachineRunningStatus
}

export default VirtualMachine
