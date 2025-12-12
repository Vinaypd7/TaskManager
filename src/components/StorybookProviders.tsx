import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { LocalizationProvider } from '../contexts/LocalizationContext';
import { ThemeProvider } from '../contexts/ThemeContext';

interface StorybookProvidersProps {
  children: React.ReactNode;
}

// Mock user for storybook
const mockUser = {
  id: '1',
  email: 'user@storybook.com',
  role: 'ROLE_MEMBER' as const,
  name: 'Storybook User',
};

// Mock auth context for storybook
const mockAuth = {
  user: mockUser,
  login: async () => mockUser,
  logout: async () => {},
  loading: false,
  isAuthenticated: true,
  isAdmin: false,
};

export const StorybookProviders: React.FC<StorybookProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};