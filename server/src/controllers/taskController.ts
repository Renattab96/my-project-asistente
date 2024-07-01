import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response): Promise<void> => {
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

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

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
