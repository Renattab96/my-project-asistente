import { Request, Response } from 'express';
import User from '../models/User';
import { uploadProfilePicture } from '../middleware/uploadMiddleware';
import { sendNotification } from '../utils/notificationUtil';
import bcrypt from 'bcryptjs';



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

// Actualizar el dato del usuario 
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, notificationsEnabled } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.notificationsEnabled = notificationsEnabled !== undefined ? notificationsEnabled : user.notificationsEnabled;

    if (req.file) {
      user.profilePicture = req.file.path;
    }

    await user.save();
    res.json(user);

    if (user.notificationsEnabled) {
      sendNotification(user, 'Profile updated successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Dar de baja el usuario Actividad del Admin 
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Cambio de contrasena por el usuario 
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Receteo de contrasenia por admin 
export const resetUserPassword = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    res.json({ message: 'Password has been reset' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cambiar Contraseña por Usuario
export const changeUserPassword = async (req: Request, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const listAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
// Notification push 

export const updateUserDeviceToken = async (req: Request, res: Response): Promise<void> => {
  const { deviceToken } = req.body;

  try {
    const user = await User.findById(req.user);
    if (user) {
      user.deviceToken = deviceToken;
      await user.save();
      res.json({ message: 'Device token updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};