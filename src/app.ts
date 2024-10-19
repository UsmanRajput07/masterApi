import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { config } from './config/config';
import { globalErrorHandler } from './middlewears/globalErrorHandler';

const app = express();

// routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
 
  res.json({ message: 'hello world' });
});

// global error handler
app.use(globalErrorHandler);
export default app;
