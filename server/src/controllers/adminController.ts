import { Request, Response } from 'express';

export const someAdminFunction = (req: Request, res: Response): void => {
  res.json({ message: 'Esta es una ruta protegida para administradores' });
};