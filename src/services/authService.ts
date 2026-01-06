import { User } from '../types';
import { ROLES } from '../constants/config';

// Mock authentication service
export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@taskmanager.com' && password === 'admin123') {
      return {
        id: '1',
        email: 'admin@taskmanager.com',
        role: ROLES.ADMIN,
        name: 'Admin User',
      };
    } else if (email === 'user@taskmanager.com' && password === 'user123') {
      return {
        id: '2',
        email: 'user@taskmanager.com',
        role: ROLES.MEMBER,
        name: 'Regular User',
      };
    }
    
    throw new Error('Invalid credentials');
  },

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
  },
};