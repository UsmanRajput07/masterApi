import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const _config = {
  port: process.env.PORT || 3000,
  MongoDbUrl: process.env.MongoDbUrl,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryName: process.env.cloudinaryName,
  cloudinaryApiKey: process.env.cloudinary_ApiKey,
  cloudinaryApiSecret: process.env.cloudinary_ApiSecret,
};

export const config = Object.freeze(_config);
