import axiosInstance from "src/api/axiosInstance";
import { TaskResponse } from "../models/tasksResponse";

export const getTasks = async (): Promise<TaskResponse> =>  {
    try {
        const response = await axiosInstance.get('/user/tasks-autogestion');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo datos protegidos:', error);
        throw error;
    }
};