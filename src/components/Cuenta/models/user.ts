export interface User {
    _id: string;
    username: string;
    lastname: string;
    email: string;
    notificationsEnabled: boolean;
    additionalInfo?: {
        address: string;
        birthDate: string; // Fecha en formato ISO string
        jobTitle: string;
        notificationTime: string; // Hora en formato string
        phoneNumber: string;
    };
}