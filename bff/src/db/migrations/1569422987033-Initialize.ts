import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1569422987033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `gcp_projects` (`id` int NOT NULL AUTO_INCREMENT, `project_id` varchar(255) NOT NULL, `project_name` varchar(255) NOT NULL, `description` text NULL, `sync_status` int NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
    await queryRunner.query(
      "CREATE TABLE `object_storages` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('local', 'amazon-s3', 'google-cloud-storage') NOT NULL, `location` varchar(255) NOT NULL, `name` varchar(240) NOT NULL, `description` text NULL, `sync_status` int NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_80d30dd0c0801f95b74a8b47a8` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    )
    await queryRunner.query(
      'CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(160) NOT NULL, `display_name` varchar(160) NULL, `email` varchar(160) NOT NULL, UNIQUE INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` (`name`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`',
      undefined
    )
    await queryRunner.query(
      'DROP INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` ON `users`',
      undefined
    )
    await queryRunner.query('DROP TABLE `users`', undefined)
    await queryRunner.query(
      'DROP INDEX `IDX_80d30dd0c0801f95b74a8b47a8` ON `object_storages`',
      undefined
    )
    await queryRunner.query('DROP TABLE `object_storages`', undefined)
    await queryRunner.query('DROP TABLE `gcp_projects`', undefined)
  }
}
