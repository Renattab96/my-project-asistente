import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// /src/controllers/authController.ts

export const registerUser = async (req: Request, res: Response) => {
  const { username, lastname, email, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      lastname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      role: 'user',
      notificationsEnabled: true,
      loginAttempts: 0,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

export const someAdminFunction = (req: Request, res: Response): void => {
  // Aquí puedes añadir lógica específica para el administrador
  res.json({ message: 'Esta es una ruta protegida para administradores' });
};
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verificar si el usuario está bloqueado
    if (user.isLocked) {
      return res.status(403).json({ message: 'Account is locked. Try again later.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.loginAttempts += 1;

      // Bloquear si hay 3 intentos fallidos
      if (user.loginAttempts >= 3) {
        user.lockUntil = Date.now() + 30 * 60 * 1000; // Bloqueo por 30 minutos
      }

      await user.save();
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Restablecer intentos fallidos y bloqueo
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};