import app from './app';
import connectDB from './database';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3001;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
