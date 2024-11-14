export interface UserAdminList {
    _id: string;
    additionalInfo?: additionalInfo;
    username: string;
    lastname: string;
    email: string;
    role: string;
    createdAt?: Date;
}

interface additionalInfo {
    address: string;
    birthDate: Date;
    jobTitle: string;
    notificationTime: string;
    phoneNumber: string;
}
