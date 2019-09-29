import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1569779670873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `gcp_project` (`id` varchar(36) NOT NULL, `projectId` varchar(255) NOT NULL, `projectName` varchar(255) NOT NULL, `description` text NULL, `syncStatus` int NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
    await queryRunner.query(
      "CREATE TABLE `object_storage` (`id` varchar(36) NOT NULL, `type` enum ('local', 'amazon-s3', 'google-cloud-storage') NOT NULL, `location` varchar(255) NOT NULL, `name` varchar(240) NOT NULL, `description` text NULL, `syncStatus` int NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_907ff1272d935a6ceec24b668b` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    )
    await queryRunner.query(
      "CREATE TABLE `virtual_machine` (`id` varchar(36) NOT NULL, `type` enum ('local', 'amazon-ec2', 'google-compute-engine') NOT NULL, `location` varchar(255) NOT NULL, `name` varchar(240) NOT NULL, `description` text NULL, `syncStatus` int NOT NULL DEFAULT 1, `runningStatus` int NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_80ea060c02fcd00fe265a4bc41` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    )
    await queryRunner.query(
      'CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(160) NOT NULL, `displayName` varchar(160) NULL, `email` varchar(160) NOT NULL, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
      undefined
    )
    await queryRunner.query(
      'DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`',
      undefined
    )
    await queryRunner.query('DROP TABLE `user`', undefined)
    await queryRunner.query(
      'DROP INDEX `IDX_80ea060c02fcd00fe265a4bc41` ON `virtual_machine`',
      undefined
    )
    await queryRunner.query('DROP TABLE `virtual_machine`', undefined)
    await queryRunner.query(
      'DROP INDEX `IDX_907ff1272d935a6ceec24b668b` ON `object_storage`',
      undefined
    )
    await queryRunner.query('DROP TABLE `object_storage`', undefined)
    await queryRunner.query('DROP TABLE `gcp_project`', undefined)
  }
}
