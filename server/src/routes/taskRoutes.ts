import { Router } from 'express';
import { createTask, updateTask, getTasks,deleteTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';


const router = Router();

router.post('/create', authMiddleware, createTask);
router.put('/update/:taskId', authMiddleware, updateTask);
router.get('/', authMiddleware, getTasks);
router.delete('/delete/:taskId', authMiddleware, deleteTask);

export default router;
