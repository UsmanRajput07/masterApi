import {config} from "../config/config";
import {HttpError} from "http-errors";
import {Request, Response, NextFunction} from "express";

export const globalErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message,
      stack: config.env === 'development' ? err.stack : '',
    })
  }