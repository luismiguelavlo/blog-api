import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnTuserCphoto1737598982906
  implements MigrationInterface
{
  name = "RenameColumnTuserCphoto1737598982906";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" RENAME COLUMN "photo" TO "image"'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" RENAME COLUMN "image" TO "photo"'
    );
  }
}
