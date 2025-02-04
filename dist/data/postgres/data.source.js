"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../../config");
const user_model_1 = require("./models/user.model");
const post_model_1 = require("./models/post.model");
const comment_model_1 = require("./models/comment.model");
const options = {
    host: config_1.envs.DB_HOST,
    port: config_1.envs.DB_PORT,
    username: config_1.envs.DB_USERNAME,
    password: config_1.envs.DB_PASSWORD,
    database: config_1.envs.DB_DATABASE,
};
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password,
    database: options.database,
    entities: [user_model_1.User, post_model_1.Post, comment_model_1.Comment],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + "/migrations/*.ts"],
    ssl: {
        rejectUnauthorized: false,
    },
});
