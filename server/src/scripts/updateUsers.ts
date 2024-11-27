import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User'; // Ruta al modelo User
import connectDB from '../config/db'; // Ruta a tu configuración de conexión

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const updateUsers = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conexión a MongoDB establecida.');

    // Actualizar usuarios existentes
    const result = await User.updateMany(
      { status: { $exists: false } }, // Si no tienen el campo `status`
      { $set: { status: 'active' } } // Lo configuramos como "active"
    );

    console.log(`${result.modifiedCount} usuarios actualizados.`);
  } catch (error) {
    console.error('Error al actualizar usuarios:', error);
  } finally {
    process.exit(0); // Finaliza el proceso
  }
};

updateUsers();
