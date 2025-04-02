import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  user?: {
    _id: Types.ObjectId;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token provided, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'S3CR3T') as { id: string };
    req.user = { _id: new Types.ObjectId(decoded.id) }; // Assigning the user ID to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};