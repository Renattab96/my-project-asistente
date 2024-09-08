import { Request, Response } from 'express';
import Task from '../models/Task'; // Asegúrate de importar tu modelo de tarea
import { AuthenticatedRequest } from '../middleware/AuthenticatedRequest'; // Importa la interfaz AuthenticatedRequest

// Obtener tareas por usuario
export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!; // Obtén el ID del usuario logueado desde el middleware de autenticación
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error al obtener las tareas');
  }
};

// Crear nueva tarea
export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, description, startDate, endDate, taskType, notificationTime } = req.body;
    const userId = req.user!; // Obtén el ID del usuario logueado desde el middleware de autenticación
    const newTask = new Task({
      user: userId,
      title,
      description,
      status: 'pending',
      history: [{ status: 'pending', date: new Date() }],
      startDate,
      endDate,
      taskType,
      notificationTime,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

// Actualizar tarea
export const modifyTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const updates = req.body;
  try {
    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).send('Error al actualizar la tarea');
  }
};

// Eliminar tarea
export const borrarTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error al eliminar la tarea');
  }
};
// Crear las tareas 
export const createTarea = async (req: Request, res: Response): Promise<void> => {
  const { title, description, startDate, endDate, taskType, notificationTime } = req.body;
  try {
    const newTask = new Task({
      user: req.user,
      title,
      description,
      status: 'pending',
      history: [{ status: 'pending', date: new Date() }],
      startDate,
      endDate,
      taskType,
      notificationTime
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Actualizar las tareas 
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const { title, description, status, startDate, endDate, taskType, notificationTime } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) {
      task.status = status;
      task.history.push({ status, date: new Date() });
    }
    if (startDate) task.startDate = startDate;
    if (endDate) task.endDate = endDate;
    if (taskType) task.taskType = taskType;
    if (notificationTime) task.notificationTime = notificationTime;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// eliminar tarea 
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// elistar las tareas en general 
export const getTasksAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};