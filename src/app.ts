import express, { NextFunction, Request, Response } from 'express';
import { globalErrorHandler } from './middlewears/globalErrorHandler';
import UserRouter from './user/userRouter';

const app = express();
app.use(express.json());

// routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
 
  res.json({ message: 'hello world' });
});

app.use("/api/users", UserRouter)
// global error handler
app.use(globalErrorHandler);
export default app;
