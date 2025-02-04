import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCaddressTuser1737598552576 implements MigrationInterface {
  name = "AddCaddressTuser1737598552576";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" varchar(100) NOT NULL DEFAULT 'unknown'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
  }
}
