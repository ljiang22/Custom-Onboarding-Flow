import axios from 'axios';
import { User, OnboardingConfig, CreateUserRequest, UpdateUserRequest } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API calls
export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/api/users');
    return response.data;
  },

  getUserByEmail: async (email: string): Promise<User> => {
    const response = await api.get(`/api/users/${email}`);
    return response.data;
  },

  createUser: async (userData: CreateUserRequest): Promise<{ message: string; user: User }> => {
    const response = await api.post('/api/users', userData);
    return response.data;
  },

  updateUser: async (email: string, userData: UpdateUserRequest): Promise<{ message: string; user: User }> => {
    const response = await api.put(`/api/users/${email}`, userData);
    return response.data;
  },

  deleteUser: async (email: string): Promise<{ message: string }> => {
    const response = await api.delete(`/api/users/${email}`);
    return response.data;
  },
};

// Onboarding config API calls
export const configApi = {
  getConfig: async (): Promise<OnboardingConfig> => {
    const response = await api.get('/api/config');
    return response.data;
  },

  updateConfig: async (config: Partial<OnboardingConfig>): Promise<{ message: string; config: OnboardingConfig }> => {
    const response = await api.put('/api/config', config);
    return response.data;
  },
};

export default api;
