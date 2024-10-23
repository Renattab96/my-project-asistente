
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


// Swagger dependencies
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
} 
)); // Habilitar CORS para todas las solicitudes

// Swagger configuration
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Asistente WEB ',
        version: '1.0.0',
        description: 'API para crear tareas cuenta  implementacion con react ',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
    },
    apis: ['./src/routes/*.ts'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  // Aumentar el límite de tamaño para solicitudes JSON
app.use(express.json({ limit: '50mb' })); // Aumentar el límite a 50 MB (ajusta según tus necesidades)
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//  Middleware  
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//rutas 
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin-route', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


