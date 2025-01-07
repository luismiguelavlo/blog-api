import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 100,
    nullable: false,
  })
  title: string;

  @Column("text", {
    nullable: false,
  })
  content: string;

  @Column("varchar", { array: true, nullable: true })
  imgs: string[];

  // publish_by
  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column("bool", {
    default: true,
  })
  status: boolean;
}
