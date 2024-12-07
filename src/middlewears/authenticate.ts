import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config/config';
import createHttpError from 'http-errors';

export interface AuthRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const parsedToken = token.split(' ')[1];

    const decoded = verify(parsedToken, config.jwtSecret as string);

    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;
    next();
  } catch (err) {
    next(createHttpError(401, 'token expire!'));
  }
};
export default authenticate;
