
import { Request, Response } from 'express';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Fix: Use 'any' type for req and res to allow access to body, json, and status properties
export const loginAdmin = async (req: any, res: any) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d',
    });

    res.json({
      _id: admin._id,
      username: admin.username,
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
