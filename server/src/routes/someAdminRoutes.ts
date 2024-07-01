import express from 'express';
import { someAdminFunction } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';
import adminOnly from '../middleware/roleMiddleware';

const router = express.Router();

router.get('/admin-data', authMiddleware, adminOnly, someAdminFunction);

export default router;
