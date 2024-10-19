import app from './src/app';
import { config } from './src/config/config';
import connectDB from './src/db';
const serverStart = async () => {
  connectDB();
  const port = config.port;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};
serverStart();
