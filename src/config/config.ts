import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const _config = {
  port: process.env.PORT || 3000,
  MongoDbUrl: process.env.MONGO_URL,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryName: process.env.cloud_name,
  cloudinaryApiKey: process.env.cloudinary_api_key,
  cloudinaryApiSecret: process.env.clouldnary_api_secret
};

export const config = Object.freeze(_config);
