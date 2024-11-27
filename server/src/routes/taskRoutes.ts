import { Router } from 'express';
import { createTask, modifyTask, getTasks,borrarTask,archiveTask, getUserWithTasks } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';


const router = Router();

/**
 * @swagger
 * tags:
 *   name: task
 *   description: API para gestionar las tareas 
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una tarea con los detalles proporcionados.
 *     tags: [task]
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
router.post('/create', authMiddleware, createTask);
/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     description: Permite a un usuario actualizar una tarea proporcionada su ID.
 *     tags: [task ]
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
 *     tags: [task ]
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
 *     summary: Eliminar una tarea  solo desde Backend
 *     description: Elimina una tarea proporcionada su ID.
 *     tags: [task]
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
/**
 * @swagger
 * /tasks/archive/{taskId}:
 *   put:
 *     summary: Archivar una tarea
 *     description: Cambia el estado de una tarea a "archivado" en lugar de eliminarla.
 *     tags: [task ]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID de la tarea a archivar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea archivada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea archivada exitosamente
 *                 task:
 *                   $ref: './src/models/task'  # Referencia al esquema de Task
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/tasks/archive/:taskId',authMiddleware, archiveTask);

// Ruta para obtener el usuario con sus tareas
router.get('/user/tasks-autogestion', authMiddleware, getUserWithTasks); 

export default router;
