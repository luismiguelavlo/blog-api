import { DataSource } from "typeorm";
import { envs } from "../../config";
import { User } from "./models/user.model";
import { Post } from "./models/post.model";
import { Comment } from "./models/comment.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const options: Options = {
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_DATABASE,
};

export const AppDataSource = new DataSource({
  type: "postgres",
  host: options.host,
  port: options.port,
  username: options.username,
  password: options.password,
  database: options.database,
  entities: [User, Post, Comment],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + "/migrations/*.ts"],
  ssl: {
    rejectUnauthorized: false,
  },
});
