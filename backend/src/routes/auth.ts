// backend/src/routes/authRoutes.ts
import express from 'express';
import { signUp, login } from '../controllers/authController';

const router = express.Router();

// Signup route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

export default router;
