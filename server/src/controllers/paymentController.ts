import { Request, Response } from 'express';
import Payment from '../models/Payment';

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  const { amount, method, months } = req.body;
  try {
    const newPayment = new Payment({
      user: req.user,
      amount,
      method,
      months,
      date: new Date()
    });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await Payment.find({ user: req.user });
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const deletePayment = async (req: Request, res: Response): Promise<void> => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findByIdAndDelete(paymentId);
    if (!payment) {
      res.status(404).json({ message: 'El pago no esta disponible ' });
      return;
    }
    res.json({ message: 'Se ha borrado exitosamente el registo ' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Disculpe los inconvenientes' });
  }
};
export const updatePayment = async (req: Request, res: Response): Promise<void> => {
  const { paymentId } = req.params;
  const { amount, method, months } = req.body;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    if (amount) payment.amount = amount;
    if (method) payment.method = method;
    if (months) payment.months = months;

    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};