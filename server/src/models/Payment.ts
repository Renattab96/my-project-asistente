import { Schema, model, Types } from 'mongoose';

interface IPayment {
  user: Types.ObjectId;
  amount: number;
  date: Date;
  method: string;
  months: number; // Nuevo campo de meses
}

const PaymentSchema = new Schema<IPayment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  date: { type: Date, default: Date.now },
  months: { type: Number, required: true } // Agregar el campo de meses
});

export default model<IPayment>('Payment', PaymentSchema);
