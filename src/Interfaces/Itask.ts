import { Types } from 'mongoose';

export interface ITask {
  user: Types.ObjectId;
  title: string;
  description: string;
  status: string;
  history: { status: string; date: Date }[];
  startDate: Date;
  endDate: Date;
  taskType: 'PERSONAL' | 'HOGAR' | 'ADMINISTRATIVA' | 'ACADEMICA' | 'LABORAL';
  notificationTime: string; // Formato HH:mm
}