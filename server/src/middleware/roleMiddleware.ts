import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default adminOnly;
