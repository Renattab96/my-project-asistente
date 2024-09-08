import { Router } from 'express';
import { createTask, modifyTask, getTasks,borrarTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';


const router = Router();

// router.post('/create', authMiddleware, createTask);
// router.put('/update/:taskId', authMiddleware, updateTask);
// router.get('/', authMiddleware, getTasks);
// router.delete('/delete/:taskId', authMiddleware, deleteTask);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una tarea con los detalles proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID del usuario que crea la tarea
 *                 example: "609e12981204e2a2c4891995"
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Reunión del equipo"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *                 example: "Planificar la próxima reunión del equipo."
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *                 default: pending
 *                 description: Estado de la tarea
 *                 example: "pending"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la tarea
 *                 example: "2024-09-08"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de finalización de la tarea
 *                 example: "2024-09-09"
 *               taskType:
 *                 type: string
 *                 enum: [PERSONAL, HOGAR, ADMINISTRATIVA, ACADEMICA, LABORAL]
 *                 description: Tipo de la tarea
 *                 example: "LABORAL"
 *               notificationTime:
 *                 type: string
 *                 description: Hora de notificación en formato HH:mm
 *                 example: "08:00"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post('/api/create', authMiddleware, createTask);
/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     description: Permite a un usuario actualizar una tarea proporcionada su ID.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID de la tarea que se va a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Reunión del equipo"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *                 example: "Planificar la próxima reunión del equipo."
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *                 description: Estado de la tarea
 *                 example: "in progress"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la tarea
 *                 example: "2024-09-08"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de finalización de la tarea
 *                 example: "2024-09-09"
 *               taskType:
 *                 type: string
 *                 enum: [PERSONAL, HOGAR, ADMINISTRATIVA, ACADEMICA, LABORAL]
 *                 description: Tipo de la tarea
 *                 example: "LABORAL"
 *               notificationTime:
 *                 type: string
 *                 description: Hora de notificación en formato HH:mm
 *                 example: "08:00"
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/update/:taskId', authMiddleware, modifyTask);
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Devuelve una lista de todas las tareas creadas por el usuario.
 *     responses:
 *       200:
 *         description: Lista de tareas devuelta exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                     description: ID del usuario que creó la tarea
 *                     example: "609e12981204e2a2c4891995"
 *                   title:
 *                     type: string
 *                     description: Título de la tarea
 *                     example: "Reunión del equipo"
 *                   description:
 *                     type: string
 *                     description: Descripción de la tarea
 *                     example: "Planificar la próxima reunión del equipo."
 *                   status:
 *                     type: string
 *                     enum: [pending, in progress, completed]
 *                     default: pending
 *                     description: Estado de la tarea
 *                     example: "in progress"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: Fecha de inicio de la tarea
 *                     example: "2024-09-08"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: Fecha de finalización de la tarea
 *                     example: "2024-09-09"
 *                   taskType:
 *                     type: string
 *                     enum: [PERSONAL, HOGAR, ADMINISTRATIVA, ACADEMICA, LABORAL]
 *                     description: Tipo de la tarea
 *                     example: "LABORAL"
 *                   notificationTime:
 *                     type: string
 *                     description: Hora de notificación en formato HH:mm
 *                     example: "08:00"
 */

router.get('/', authMiddleware, getTasks);
/**
 * @swagger
 * /api/delete/{taskId}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea proporcionada su ID.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID de la tarea que se va a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/delete/:taskId', authMiddleware, borrarTask);


export default router;
