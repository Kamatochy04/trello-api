import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkRole = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const sesretKey = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
    const decoded = jwt.verify(token, sesretKey) as { role?: string };

    if (decoded.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
