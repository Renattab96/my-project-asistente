import axiosInstance from "src/api/axiosInstance";
import { User } from "../models/user";

export const getUserInfo = async (id: string): Promise<User> =>  {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        console.log("response", response.data)
        return response.data;
    } catch (error) {
        console.error('Error obteniendo datos protegidos:', error);
        throw error;
    }
};