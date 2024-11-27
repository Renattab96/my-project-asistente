import { Schema, model, Types } from 'mongoose';

interface ITask {
    user: Types.ObjectId;
    title: string;
    description: string;
    status: string;
    history: { status: string; date: Date }[];
    startDate: Date;
    endDate: Date;
    taskType: 'PERSONAL' | 'HOGAR' | 'ADMINISTRATIVA' | 'ACADEMICA' | 'LABORAL';
    notificationTime: { type: String, required: true }, // Formato HH:mm
    notificationSent: boolean; // Cambiado a booleano simple
}

const TaskSchema = new Schema<ITask>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in progress', 'completed', 'archivado'], default: 'pending' },
    history: [{ status: String, date: Date }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    taskType: { type: String, enum: ['PERSONAL', 'HOGAR', 'ADMINISTRATIVA', 'ACADEMICA', 'LABORAL'], required: true },
    notificationTime: { type: String, required: true }, // Formato HH:mm
    notificationSent: { type: Boolean, default: false }, // Correctamente definido como Boolean
});

export default model<ITask>('Task', TaskSchema);
