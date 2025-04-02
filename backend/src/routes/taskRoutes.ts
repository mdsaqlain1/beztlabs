import express from 'express';
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskStatus
} from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authenticate as express.RequestHandler);

// Task routes following the same pattern as authRoutes
router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/:id/toggle', toggleTaskStatus);

export default router;