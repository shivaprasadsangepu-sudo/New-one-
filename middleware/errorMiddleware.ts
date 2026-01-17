
import { Request, Response, NextFunction } from 'express';

// Fix: Use 'any' for res to allow access to statusCode and status methods which were reported as missing
export const errorHandler = (err: any, req: Request, res: any, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
