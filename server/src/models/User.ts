import { Schema, model } from 'mongoose';

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
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    profilePicture: { type: String },
    notificationsEnabled: { type: Boolean, default: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number },
    deviceToken: { type: String },
});

UserSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

export default model<IUser>('User', UserSchema);
