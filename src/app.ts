import express from 'express';
import { globalErrorHandler } from './middlewears/globalErrorHandler';
import UserRouter from './user/userRouter';
import bookRouter from './book/bookRouter';
import cors from 'cors';
import { config } from './config/config';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: config.frotendDomain,
  }),
);
// example route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {

//   res.json({ message: 'hello world' });
// });

app.use('/api/users', UserRouter);
app.use('/api/books', bookRouter);

// global error handler
app.use(globalErrorHandler);
export default app;
