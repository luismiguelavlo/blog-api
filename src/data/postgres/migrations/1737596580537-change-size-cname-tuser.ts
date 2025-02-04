import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSizeCnameTuser1737596580537 implements MigrationInterface {
  name = "ChangeSizeCnameTuser1737596580537";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying(100)`
    );

    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying(80)`
    );

    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`
    );
  }
}
