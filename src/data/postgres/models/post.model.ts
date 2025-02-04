import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";
import { Comment } from "./comment.model";

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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "publish_by" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
