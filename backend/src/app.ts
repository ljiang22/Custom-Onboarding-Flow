import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route for Railway
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Custom Onboarding Flow Backend is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

export default app;
