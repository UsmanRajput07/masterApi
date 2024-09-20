import mongoose from 'mongoose';
import { config } from '../src/config/config';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
      console.log('failed connecting to MongoDB', err);
    });
    await mongoose.connect(config.MongoDbUrl as string);
  } catch (err) {
    console.log('failed connecting to MongoDB', err);
  }
};

export default connectDB;