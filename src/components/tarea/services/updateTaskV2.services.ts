import axiosInstance from "src/api/axiosInstance";
// import { TaskToResponse } from "../models/tasksResponse";
import { TaskCreate } from "../models/taskCreate";
import { TaskToResponse } from "../models/tasksResponse";
import { TaskStatus } from "src/models/tasksStatus.model";

// Puedes usar un genérico para tipar la respuesta que esperas
export const updateTaskV2 = async (task: TaskCreate, status:TaskStatus, id: string): Promise<TaskToResponse> => {
    try {
        const response = await axiosInstance.put(`/update/${id}`, {
            title: task.title,
            description: task.description,
            status: status,
            startDate: task.startDate,
            endDate: task.endDate,
            taskType: task.taskType,
            notificationTime: task.notificationTime
        });
        return response.data
    } catch (error) {
        console.error('Error actualizando la tarea:', error);
        throw error;
    }
};