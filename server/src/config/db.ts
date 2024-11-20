
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error('MONGO_URI no está definida en las variables de entorno');
    }

    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Error desconocido:', error);
    }
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};

export default connectDB;