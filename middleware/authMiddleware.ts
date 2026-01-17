
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define custom interface to extend Request
interface AuthRequest extends Request {
  admin?: any;
}

// Fix: Use 'any' for req and res to allow access to headers, status, and avoid signature mismatch in routes
export const protect = (req: any, res: any, next: NextFunction) => {
  let token;

  // Fix: Property 'headers' access via any type casting
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      // Attach decoded admin data to the request
      req.admin = decoded;
      return next();
    } catch (error) {
      console.error('Auth Error:', error);
      // Fix: Property 'status' access via any type casting
      return res.status(401).json({ 
        message: 'Not authorized, session expired or invalid token',
        code: 'AUTH_FAILED'
      });
    }
  }

  if (!token) {
    // Fix: Property 'status' access via any type casting
    return res.status(401).json({ 
      message: 'Not authorized, access token missing',
      code: 'NO_TOKEN'
    });
  }
};
