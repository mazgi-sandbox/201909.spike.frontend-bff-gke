import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1569247311898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(160) NOT NULL, `display_name` varchar(160) NULL, `email` varchar(160) NOT NULL, UNIQUE INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` (`name`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `IDX_51b8b26ac168fbe7d6f5653e6c` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
