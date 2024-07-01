import { Router } from 'express';
import { createPayment, getPayments, deletePayment, updatePayment } from '../controllers/paymentController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createPayment);
router.put('/update/:paymentId', authMiddleware, updatePayment);
router.get('/', authMiddleware, getPayments);
router.delete('/delete/:paymentId', authMiddleware, deletePayment);

export default router;
