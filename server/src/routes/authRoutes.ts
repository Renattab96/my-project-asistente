import { Router } from 'express';
import { registerUser, login ,logout} from '../controllers/authcontroller';

/**
 * @swagger
 * tags:
 *   name: auth:
 *   description: se aplica a los administradores de sistema y desarrolladores 
 */

const router = Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: 
 *       - auth
 *     description: Permite registrar un nuevo usuario en la aplicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "usuario123"
 *               lastname:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@ejemplo.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *               confimpassword:
 *                 type: string
 *                 description: Confirmación de la contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '../models/User.ts'
 *       400:
 *         description: Error de validación (contraseñas no coinciden, etc.)
 *       500:
 *         description: Error interno del servidor
 */
router.post('/register', registerUser);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: 
 *       - auth
 *     description: Permite a un usuario iniciar sesión en la aplicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: Usuario cerrado sesión exitosamente
 *       401:
 *         description: El usuario no está autenticado
 */
router.post('/logout', logout);
// app.use('/api/auth', authRoutes)

export default router;
