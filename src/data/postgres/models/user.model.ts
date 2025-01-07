import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 80,
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

  @Column("varchar")
  photo: string;

  @Column("bool", {
    default: true,
  })
  status: boolean;
}
