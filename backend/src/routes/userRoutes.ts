import express from 'express';
import {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getOnboardingConfig,
  updateOnboardingConfig
} from '../controllers/userController';

const router = express.Router();

// User routes
router.get('/users', getAllUsers);
router.get('/users/:email', getUserByEmail);
router.post('/users', createUser);
router.put('/users/:email', updateUser);
router.delete('/users/:email', deleteUser);

// Onboarding configuration routes
router.get('/config', getOnboardingConfig);
router.put('/config', updateOnboardingConfig);

export default router;
