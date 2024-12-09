import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733770883650 implements MigrationInterface {
  name = "Default1733770883650";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" ADD "emoji" character varying NOT NULL DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "emoji"`);
  }
}
