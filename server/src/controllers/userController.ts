import { Request, Response } from 'express';
import User from '../models/User';
import { uploadProfilePicture } from '../middleware/uploadMiddleware';
// import { sendNotification } from '../utils/notificationUtil';
import bcrypt from 'bcryptjs';



export const registerUser = async (req: Request, res: Response) => {
  const { username, lastname, email, password, confirmpassword, role } = req.body;

  // Verifica si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe, pruebe con otro correo electronico ' });
  }
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
      role: role || 'user',
      notificationsEnabled: true,
      loginAttempts: 0,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error en la creacion:', error);
    res.status(500).json({ message: 'Error  al registra ususario ' });
  }
};

// Actualizar el dato del usuario 
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, notificationsEnabled } = req.body;

  try {
    // Asegúrate de que req.user sea el ID del usuario autenticado
    const userId = req.user._id || req.user;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Actualizamos solo los campos recibidos en el body
    if (username) user.username = username;
    if (email) user.email = email;
    if (notificationsEnabled !== undefined) {
      user.notificationsEnabled = notificationsEnabled;
    }

    // Actualizar foto de perfil si se envió un archivo
    if (req.file) {
      user.profilePicture = req.file.path;
    }

    // Guardar los cambios en la base de datos
    await user.save();

    // Respuesta exitosa
    res.json(user);

    // Enviar notificación si las notificaciones están habilitadas
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
export const changeUserPassword = async (req: Request, res: Response): Promise<any> => {
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

export const updateUserDeviceToken = async (req: Request, res: Response): Promise<any> => {
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

       // Excluir los campos 'password', 'confirmpassword' y 'email' con .select('-password -confirmpassword -email')
    const user = await User.findById(req.params.id).select('-password -confirmpassword -email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAdditionalInfo = async (req: Request, res: Response): Promise<void> => {
  const { birthDate, phoneNumber, notificationTime, address, jobTitle } = req.body;
  
  try {
    const user = await User.findById(req.user);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Actualizar los campos de datos adicionales
    if (birthDate) user.additionalInfo.birthDate = birthDate;
    if (phoneNumber) user.additionalInfo.phoneNumber = phoneNumber;
    if (notificationTime) user.additionalInfo.notificationTime = notificationTime;
    if (address) user.additionalInfo.address = address;
    if (jobTitle) user.additionalInfo.jobTitle = jobTitle;

    await user.save();
    res.json({ message: 'Additional info updated successfully', user });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};