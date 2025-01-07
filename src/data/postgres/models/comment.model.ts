import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", {
    nullable: false,
  })
  content: string;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column("bool", {
    default: true,
  })
  status: boolean;
}
