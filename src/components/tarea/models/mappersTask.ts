import { Task } from "./task";
import { TaskResponse, TaskToResponse } from "./tasksResponse";

export const mapApiResponseToTask = (response: TaskResponse): Task[] => {
    return response.tasks.map((task) => ({
        _id: task._id,
        accion: task.title,
        fechainicio: task.startDate,
        fechavencimiento: task.endDate,
        status: task.status,
        claseTarea: task.taskType,
        hora: task.notificationTime,
        descripcion: task.description,
    }));
}

export const mapTaskToResponseToTask = (task: TaskToResponse): Task => {
    return {
        _id: task._id,
        accion: task.title,
        fechainicio: task.startDate,
        fechavencimiento: task.endDate,
        status: task.status,
        claseTarea: task.taskType,
        hora: task.notificationTime,
        descripcion: task.description
    }
}
