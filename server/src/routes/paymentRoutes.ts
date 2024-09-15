import { Router } from 'express';
import { createPayment, getPayments, deletePayment, updatePayment } from '../controllers/paymentController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();
/**
 * @swagger
 * /payments/create:
 *   post:
 *     summary: Crear un nuevo pago
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '../models/Payment.ts'
 *     responses:
 *       201:
 *         description: Pago creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '../models/Payment.ts'
 *       400:
 *         description: Error en la creación del pago
 */
router.post('/create', authMiddleware, createPayment);
/**
 * @swagger
 * /payments/update/{paymentId}:
 *   put:
 *     summary: Actualizar un pago existente
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pago a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Pago actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/Payment.ts'
 *       400:
 *         description: Error en la actualización del pago
 */

router.put('/update/:paymentId', authMiddleware, updatePayment);
/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Obtener todos los pagos
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Lista de pagos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../models/Payment.ts'
 */
router.get('/', authMiddleware, getPayments);

/**
 * @swagger
 * /payments/delete/{paymentId}:
 *   delete:
 *     summary: Eliminar un pago existente
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pago a eliminar
 *     responses:
 *       200:
 *         description: Pago eliminado correctamente
 *       400:
 *         description: Error al eliminar el pago
 */
router.delete('/delete/:paymentId', authMiddleware, deletePayment);

export default router;
