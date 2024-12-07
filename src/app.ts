import express from 'express';
import { globalErrorHandler } from './middlewears/globalErrorHandler';
import UserRouter from './user/userRouter';
import bookRouter from './book/bookRouter';

const app = express();
app.use(express.json());

// example route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {

//   res.json({ message: 'hello world' });
// });

app.use('/api/users', UserRouter);
app.use('/api/books', bookRouter);

// global error handler
app.use(globalErrorHandler);
export default app;
