import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { _id: string }; // Define el tipo de `user` aquí
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Suponiendo que el token se envía en el encabezado de autorización
  if (!token) {
    return res.status(401).send('Autenticación fallida');
  }

  try {
    const decoded = jwt.verify(token, 'tu_secreto_jwt') as { userId: string }; // Reemplaza 'your_jwt_secret' con tu clave secreta
    req.user = { _id: decoded.userId }; // Suponiendo que el token contiene un userId
    next();
  } catch (error) {
    res.status(401).send('Autenticación fallida');
  }
};

export default authMiddleware;