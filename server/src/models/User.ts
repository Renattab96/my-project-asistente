import { Schema, model } from 'mongoose';

// Define la interfaz del subdocumento additionalInfo
interface IAdditionalInfo {
  birthDate: Date;
  phoneNumber: string;
  notificationTime: string;
  address: string;
  jobTitle: string;
  email: string;
}
interface IUser {
  username: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
  profilePicture?: string;
  notificationsEnabled: boolean;
  role: string;
  loginAttempts: number;
  lockUntil: number;
  deviceToken?: string;
  tasks: Schema.Types.ObjectId[];
  additionalInfo: IAdditionalInfo;
    status: 'active' | 'inactive'; // Nuevo campo
  createdAt?: Date;  // Fecha de creación
  updatedAt?: Date;  // Fecha de actualización
}


const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    profilePicture: { type: String, default: '' }, // Almacena la imagen en formato base64
    notificationsEnabled: { type: Boolean },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number },
    deviceToken: { type: String },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    additionalInfo: {
      birthDate: { type: Date },
      phoneNumber: { type: String },
      notificationTime: { type: String }, // Formato: "09:00" para las horas
      address: { type: String },
      jobTitle: { type: String }
    },
      // Nuevo campo para el estado del usuario
  status: {
    type: String,
    enum: ['active', 'inactive'], // Valores permitidos
    default: 'active', // Valor por defecto
    },
  },
  {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
  }
);

UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

export default model<IUser>('User', UserSchema);
