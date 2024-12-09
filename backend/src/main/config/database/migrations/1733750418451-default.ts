import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733750418451 implements MigrationInterface {
  name = "Default1733750418451";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" ADD "slug" character varying NOT NULL DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "slug"`);
  }
}
