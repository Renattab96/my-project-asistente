import axiosInstance from "src/api/axiosInstance";
import { UpdateUSer } from "../models/updateUser";
import { User } from "../models/user";
// Puedes usar un genérico para tipar la respuesta que esperas
export const updateUserInfo = async ({
    email,
    jobTitle,
    address,
    phoneNumber,
    notificationsEnabled
}: UpdateUSer): Promise<User> => {
    try {
        const response = await axiosInstance.put(`/users/update-additional-info/`, {
            email,
            jobTitle,
            address,
            phoneNumber,
            notificationsEnabled
        });
        return response.data.user
    } catch (error) {
        console.error('Error actualizando informacion del usuario:', error);
        throw error;
    }
};