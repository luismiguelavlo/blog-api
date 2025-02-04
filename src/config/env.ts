import "dotenv/config";
//process.loadEnvFile();
import { get } from "env-var";

console.log(get("DATABASE").required().asString());

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DB_HOST: get("HOST_DATABASE").required().asString(),
  DB_USERNAME: get("USERNAME_DATABASE").required().asString(),
  DB_PASSWORD: get("PASSWORD_DATABASE").required().asString(),
  DB_DATABASE: get("DATABASE").required().asString(),
  DB_PORT: get("PORT_DATABASE").required().asPortNumber(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  JWT_EXPIRE_IN: get("JWT_EXPIRE_IN").required().asString(),
  SEND_EMAIL: get("SEND_EMAIL").required().asBool(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
  FIREBASE_API_KEY: get("FIREBASE_API_KEY").required().asString(),
  FIREBASE_PROJECT_ID: get("FIREBASE_PROJECT_ID").required().asString(),
  FIREBASE_STORAGE_BUCKET: get("FIREBASE_STORAGE_BUCKET").required().asString(),
  FIREBASE_APP_ID: get("FIREBASE_APP_ID").required().asString(),
  AWS_ACCESS_KEY: get("AWS_ACCESS_KEY").required().asString(),
  AWS_SECRET_KEY: get("AWS_SECRET_KEY").required().asString(),
  AWS_S3_BUCKET_NAME: get("AWS_S3_BUCKET_NAME").required().asString(),
  AWS_REGION: get("AWS_REGION").required().asString(),
};
