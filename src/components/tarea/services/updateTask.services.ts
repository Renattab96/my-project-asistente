import axiosInstance from "src/api/axiosInstance";
import { TaskStatus } from "src/models/tasksStatus.model";
import { TaskToResponse } from "../models/tasksResponse";

// Puedes usar un genérico para tipar la respuesta que esperas
export const postUpdateTask = async (taskId: string, status: TaskStatus): Promise<TaskToResponse> => {
    try {
        const response = await axiosInstance.put(`/update/${taskId}`, {
            status: status,
        });
        return response.data
    } catch (error) {
        console.error('Error actualizando la tarea:', error);
        throw error;
    }
};