import { Router } from 'express';
import { registerUser, login ,logout} from '../controllers/authcontroller';



const router = Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario en la aplicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: "Juan Perez"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@ejemplo.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación en los datos del usuario
 */
router.post('/register', registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
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
 *     summary: Cerrar sesión
 *     description: Permite a un usuario cerrar su sesión actual.
 *     responses:
 *       200:
 *         description: Usuario cerrado sesión exitosamente
 *       401:
 *         description: El usuario no está autenticado
 */
router.post('/logout', logout);
// app.use('/api/auth', authRoutes)

export default router;
