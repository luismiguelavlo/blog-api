import { S3Client } from "@aws-sdk/client-s3";
import { envs } from "./env";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: envs.AWS_ACCESS_KEY,
    secretAccessKey: envs.AWS_SECRET_KEY,
  },
  region: envs.AWS_REGION,
});

export { s3Client };
