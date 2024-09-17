import app from './src/app';
import { config } from './src/config/config';

const serverStart = () => {
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};
serverStart();
