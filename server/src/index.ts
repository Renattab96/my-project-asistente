
import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import paymentRoutes from './routes/paymentRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/someAdminRoutes';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors()); // Habilitar CORS para todas las solicitudes

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin-route', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


