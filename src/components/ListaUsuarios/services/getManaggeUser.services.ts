import axiosInstance from "src/api/axiosInstance";
import { UserAdminList } from "../models/userAdminList";

export const getManaggeUser = async (): Promise<UserAdminList[]> =>  {
    try {
        const response = await axiosInstance.get('/users/all-users');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo datos protegidos:', error);
        throw error;
    }
};