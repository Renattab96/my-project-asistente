import { Router } from 'express';
import { updateUser , resetUserPassword ,changeUserPassword,listAllUsers , updateUserDeviceToken , registerUser,getUserById} from '../controllers/userController';
import { deleteUser } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import { uploadProfilePicture } from '../middleware/uploadMiddleware';
import adminOnly from '../middleware/roleMiddleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: user
 *   description: API para gestión de usuarios
 */


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario.
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/User.ts'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/register', registerUser);
/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Permite a un usuario actualizar sus datos.
 *      tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '../models/User.ts'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error de validación
 */
router.put('/update', authMiddleware, uploadProfilePicture, updateUser);
/**
 * @swagger
 * /api/users/all-users:
 *   get:
 *     summary: Listar todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados.
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Lista de usuarios devuelta exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../models/User.ts'
 */
router.get('/all-users', authMiddleware, adminOnly, listAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Devuelve los detalles de un usuario dado su ID.
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que se va a obtener
 *     responses:
 *       200:
 *         description: Usuario devuelto exitosamente
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '../models/User.ts'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', authMiddleware, getUserById);

// 
router.put('/update-device-token', authMiddleware, updateUserDeviceToken);



/**
 * @swagger
 * /api/users/delete/{userId}:
 *   delete:
 *     summary: Eliminar un usuario ROLE ADMIN
 *     description: Permite eliminar un usuario especificado por su ID. esto solo se puede gestionar mediante admin
*     tags: [ user ]
 *      security:
*       - bearerAuth: []  # Esto asume que usas JWT o algún otro token de autenticación del admin
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que se va a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/delete/:userId', authMiddleware, adminOnly, deleteUser);

/**
 * @swagger
* /api/users/reset-password/{userId}:
*   put:
*     summary: Restablecer la contraseña de un usuario  ROLE ADMIN
*     description: Permite a un administrador restablecer la contraseña de un usuario especificado por su ID. con el rol de admin
*     tags: [user]
*      security:
*       - bearerAuth: []  # Esto asume que usas JWT o algún otro token de autenticación del admin
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Contraseña restablecida exitosamente
*       404:
*         description: Usuario no encontrado
*/
router.put('/reset-password/:userId', authMiddleware, adminOnly, resetUserPassword);

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Cambiar la contraseña del usuario  ROLE ADMIN
 *     description: Permite a un usuario autenticado cambiar su contraseña proporcionando la contraseña actual y una nueva. con el rol de admin
 *     security:
 *       - bearerAuth: []  # Esto asume que usas JWT o algún otro token de autenticación
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual del usuario
 *                 example: "current_password_123"
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *                 example: "new_password_456"
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 *       401:
 *         description: Autenticación fallida o no autorizada
 *       500:
 *         description: Error del servidor
 */
router.put('/change-password', authMiddleware, changeUserPassword);


export default router;
