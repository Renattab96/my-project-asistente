import { Router } from 'express';
import { registerUser, login ,logout} from '../controllers/authcontroller';

/**
 * @swagger
 * tags:
 *   name: user:
 *   description: se aplica a los administradores de sistema y desarrolladores 
 */

const router = Router();

router.post('/register', registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión en la aplicación.
 *    tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/User.ts'
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@ejemplo.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', login);
/**
 * @swagger
 * /api/auth/logout:
 *   post: 
 *     summary: Cerrar sesión  [admin &user]
 *     description: Permite a un usuario cerrar su sesión actual. 
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Usuario cerrado sesión exitosamente
 *       401:
 *         description: El usuario no está autenticado
 */
router.post('/logout', logout);
// app.use('/api/auth', authRoutes)

export default router;
