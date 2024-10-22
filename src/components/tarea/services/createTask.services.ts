import axiosInstance from "src/api/axiosInstance";
// import { TaskToResponse } from "../models/tasksResponse";
import { TaskCreate } from "../models/taskCreate";
import { TaskToResponse } from "../models/tasksResponse";

// Puedes usar un genérico para tipar la respuesta que esperas
export const createTask = async (task: TaskCreate): Promise<TaskToResponse> => {
    try {
        const response = await axiosInstance.post(`/create/`, {
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            endDate: task.endDate,
            taskType: "LABORAL",
            notificationTime: task.notificationTime
        });
        return response.data
    } catch (error) {
        console.error('Error actualizando la tarea:', error);
        throw error;
    }
};