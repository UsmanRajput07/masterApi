import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const _config = {
  port: process.env.PORT,
  MongoDbUrl: process.env.MONGO_URL,
};

export const config = Object.freeze(_config);
