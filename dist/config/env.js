"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
// import "dotenv/config";
process.loadEnvFile();
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(),
    DB_HOST: (0, env_var_1.get)("HOST_DATABASE").required().asString(),
    DB_USERNAME: (0, env_var_1.get)("USERNAME_DATABASE").required().asString(),
    DB_PASSWORD: (0, env_var_1.get)("PASSWORD_DATABASE").required().asString(),
    DB_DATABASE: (0, env_var_1.get)("DATABASE").required().asString(),
    DB_PORT: (0, env_var_1.get)("PORT_DATABASE").required().asPortNumber(),
    JWT_SEED: (0, env_var_1.get)("JWT_SEED").required().asString(),
    JWT_EXPIRE_IN: (0, env_var_1.get)("JWT_EXPIRE_IN").required().asString(),
    SEND_EMAIL: (0, env_var_1.get)("SEND_EMAIL").required().asBool(),
    MAILER_SERVICE: (0, env_var_1.get)("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY: (0, env_var_1.get)("MAILER_SECRET_KEY").required().asString(),
    WEBSERVICE_URL: (0, env_var_1.get)("WEBSERVICE_URL").required().asString(),
    FIREBASE_API_KEY: (0, env_var_1.get)("FIREBASE_API_KEY").required().asString(),
    FIREBASE_PROJECT_ID: (0, env_var_1.get)("FIREBASE_PROJECT_ID").required().asString(),
    FIREBASE_STORAGE_BUCKET: (0, env_var_1.get)("FIREBASE_STORAGE_BUCKET").required().asString(),
    FIREBASE_APP_ID: (0, env_var_1.get)("FIREBASE_APP_ID").required().asString(),
};
