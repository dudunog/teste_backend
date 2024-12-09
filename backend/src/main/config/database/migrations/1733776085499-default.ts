import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733776085499 implements MigrationInterface {
  name = "Default1733776085499";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" ADD "color" character varying NOT NULL DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "color"`);
  }
}
