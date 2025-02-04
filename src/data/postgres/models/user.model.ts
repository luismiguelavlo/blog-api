import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { encriptAdapter } from "../../../config";
import { Post } from "./post.model";
import { Comment } from "./comment.model";

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 100,
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
  })
  surname: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column("varchar", {
    nullable: false,
  })
  password: string;

  @Column("date", {
    nullable: false,
  })
  birthdate: Date;

  @Column("varchar", {
    nullable: true,
    default: "users/149071.png",
  })
  photo: string;

  @Column("enum", {
    enum: UserRole,
    default: UserRole.USER,
  })
  rol: UserRole;

  @Column("enum", {
    enum: Status,
    default: Status.INACTIVE,
  })
  status: Status;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  encryptedPassword() {
    this.password = encriptAdapter.hash(this.password);
  }
}
