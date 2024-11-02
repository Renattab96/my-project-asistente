import { Router } from 'express';
import { updateUser , resetUserPassword ,changeUserPassword,listAllUsers ,updateUserDeviceToken , registerUser,getUserById, updateAdditionalInfo,uploadProfilePicture,deleteUser,updateProfilePicture, deleteProfilePicture,getProfilePictureById} from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
// import { uploadProfilePicture } from '../middleware/uploadMiddleware';
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
 *     description: Permite a un usuario actualizar sus datos como username, email y notificaciones habilitadas.
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: RenattaBenitez
 *               email:
 *                 type: string
 *                 example: renatta@example.com
 *               notificationsEnabled:
 *                 type: boolean
 *                 example: true
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 notificationsEnabled:
 *                   type: boolean
 *                 profilePicture:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
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


/**
 * @swagger
 * /api/users/delete/{userId}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: 
 *       - user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado (solo para administradores)
 */
router.delete('/delete/:userId', authMiddleware, adminOnly, deleteUser);


/**
 * @swagger
 * /api/users/reset-password/{userId}:
 *   put:
 *     summary: Restablecer la contraseña de un usuario ADMINISTRADOR 
 *     tags: 
 *       - user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario al que se le restablecerá la contraseña
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Nueva contraseña para el usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado (solo para administradores)
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
/**
 * @swagger
 * /api/users/update-additional-info/{userId}:
 *   put:
 *     summary: Actualizar la información adicional del usuario
 *     tags: [User]
 *     description: Permite a un administrador actualizar los datos adicionales de un usuario (teléfono, cargo, dirección, etc.)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               phoneNumber:
 *                 type: string
 *                 example: "555-5555"
 *               notificationTime:
 *                 type: string
 *                 example: "08:00"
 *               address:
 *                 type: string
 *                 example: "123 Example St"
 *               jobTitle:
 *                 type: string
 *                 example: "Manager"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/update-additional-info', authMiddleware, updateAdditionalInfo);


// Eliminar sesion 
router.put('/update-device-token', authMiddleware, updateUserDeviceToken);
// subir fotos de perfil 
router.post('/upload-profile-picture', uploadProfilePicture);
// editar o actualizar foto de perfil 
router.put('/update-profile-picture', updateProfilePicture);
// eliminar foto de perfil
router.put('/delete-profile-picture', deleteProfilePicture);

// consultar la imagen
router.get('/profile-picture/:id', getProfilePictureById);

export default router;
