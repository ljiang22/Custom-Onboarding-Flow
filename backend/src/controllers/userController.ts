import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import OnboardingConfig from '../models/OnboardingConfig';

// Get all users (for data table)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user by email (for resuming onboarding)
export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select('-password');
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create new user (step 1)
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }
    
    const user = new User({
      email,
      password, // In production, hash this password
      currentStep: 1
    });
    
    await user.save();
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user._id, email: user.email, currentStep: user.currentStep }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update user data (steps 2 and 3)
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const updateData = req.body;
    
    const user = await User.findOneAndUpdate(
      { email },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json({ 
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Get onboarding configuration
export const getOnboardingConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    let config = await OnboardingConfig.findOne({});
    
    // If no config exists, create default one
    if (!config) {
      config = new OnboardingConfig({
        page2Components: [
          { type: 'aboutMe', order: 1 },
          { type: 'birthdate', order: 2 }
        ],
        page3Components: [
          { type: 'address', order: 1 }
        ]
      });
      await config.save();
    }
    
    res.json(config);
  } catch (error) {
    console.error('Error fetching onboarding config:', error);
    res.status(500).json({ error: 'Failed to fetch onboarding configuration' });
  }
};

// Update onboarding configuration
export const updateOnboardingConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page2Components, page3Components } = req.body;
    
    let config = await OnboardingConfig.findOne({});
    
    if (!config) {
      config = new OnboardingConfig({
        page2Components,
        page3Components
      });
    } else {
      config.page2Components = page2Components;
      config.page3Components = page3Components;
    }
    
    await config.save();
    res.json({ 
      message: 'Onboarding configuration updated successfully',
      config
    });
  } catch (error) {
    console.error('Error updating onboarding config:', error);
    res.status(500).json({ error: 'Failed to update onboarding configuration' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    
    const user = await User.findOneAndDelete({ email });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json({ 
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
