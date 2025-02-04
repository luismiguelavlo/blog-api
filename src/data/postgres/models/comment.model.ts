import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";
import { Post } from "./post.model";

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

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "commented_by" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "related_post_id" })
  post: Post;
}
