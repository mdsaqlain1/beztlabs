import { Request, Response } from 'express';
import Task from '../models/taskModel';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      category: req.body.category,
      user: req.user._id
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed, category } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, completed, category},
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting task' });
  }
};

export const toggleTaskStatus = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    task.completed = !task.completed;
    await task.save();
    
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error toggling task status' });
  }
};