import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733694207042 implements MigrationInterface {
  name = "Default1733694207042";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD "listId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d2275fe92da6a114d70796b7344" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d2275fe92da6a114d70796b7344"`
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "listId"`);
  }
}
