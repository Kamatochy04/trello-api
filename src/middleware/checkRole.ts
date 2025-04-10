import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/authenticatedAdmin.type';

export const checkRole = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
    const decoded = jwt.verify(token, secretKey) as { id: number; role?: string };

    req.user = {
      id: decoded.id,
    };

    if (decoded.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
