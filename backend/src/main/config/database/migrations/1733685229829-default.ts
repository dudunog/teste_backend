import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733685229829 implements MigrationInterface {
  name = "Default1733685229829";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "list_tasks_task" ("listId" uuid NOT NULL, "taskId" uuid NOT NULL, CONSTRAINT "PK_ec9d38dae95d7464b4e7ccded29" PRIMARY KEY ("listId", "taskId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2622c735a94a679f53f46a71ad" ON "list_tasks_task" ("listId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_731a0e9344695fff3f8859e318" ON "list_tasks_task" ("taskId") `
    );
    await queryRunner.query(
      `ALTER TABLE "list_tasks_task" ADD CONSTRAINT "FK_2622c735a94a679f53f46a71ad6" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "list_tasks_task" ADD CONSTRAINT "FK_731a0e9344695fff3f8859e3186" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list_tasks_task" DROP CONSTRAINT "FK_731a0e9344695fff3f8859e3186"`
    );
    await queryRunner.query(
      `ALTER TABLE "list_tasks_task" DROP CONSTRAINT "FK_2622c735a94a679f53f46a71ad6"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_731a0e9344695fff3f8859e318"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2622c735a94a679f53f46a71ad"`
    );
    await queryRunner.query(`DROP TABLE "list_tasks_task"`);
    await queryRunner.query(`DROP TABLE "list"`);
  }
}
