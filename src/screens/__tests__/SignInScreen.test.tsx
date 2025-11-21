import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInScreen } from '../SignInScreen';
import { createUser } from '../../__tests__/__factories__/userFactory';

jest.mock('../../contexts/AuthContext', () => {
  const React = require('react');
  const { createContext } = React;
  const AuthContext = createContext({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    loading: false,
    isAuthenticated: false,
    isAdmin: false,
  });

  return {
    AuthContext,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuthContext: () => {
      const context = require('react').useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
      }
      return context;
    },
  };
});

jest.mock('../../contexts/ThemeContext', () => {
  const React = require('react');
  const { createContext } = React;
  const ThemeContext = createContext({
    theme: require('../../constants/theme').lightTheme,
    themeMode: 'light',
    isDark: false,
    toggleTheme: jest.fn(),
    setThemeMode: jest.fn(),
    loading: false,
  });

  return {
    ThemeContext,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: () => {
      const context = require('react').useContext(ThemeContext);
      if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
      return context;
    },
  };
});

jest.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    locale: 'en',
    changeLanguage: jest.fn(),
    loading: false,
  }),
}));

jest.mock('../../hooks/useErrorHandler', () => ({
  useErrorHandler: () => ({
    handleError: jest.fn(),
  }),
}));

jest.mock('../../utils/alertHelper', () => ({
  showAlert: jest.fn(),
}));

describe('SignInScreen', () => {
  const mockLogin = jest.fn();
  const mockHandleError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('../../contexts/AuthContext'), 'useAuthContext').mockReturnValue({
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      loading: false,
      isAuthenticated: false,
      isAdmin: false,
    });
    jest.spyOn(require('../../hooks/useErrorHandler'), 'useErrorHandler').mockReturnValue({
      handleError: mockHandleError,
    });
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => children;

  it('should render sign in form', () => {
    const { getByPlaceholderText, getAllByText } = render(
      <TestWrapper>
        <SignInScreen />
      </TestWrapper>
    );

    expect(getByPlaceholderText('auth.email')).toBeTruthy();
    expect(getByPlaceholderText('auth.password')).toBeTruthy();
    expect(getAllByText('auth.signIn').length).toBeGreaterThan(0);
  });

  it('should call login with email and password', async () => {
    const user = createUser();
    mockLogin.mockResolvedValue(user);

    const { getByPlaceholderText, getAllByText } = render(
      <TestWrapper>
        <SignInScreen />
      </TestWrapper>
    );

    fireEvent.changeText(getByPlaceholderText('auth.email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('auth.password'), 'password123');
    const signInButtons = getAllByText('auth.signIn');
    fireEvent.press(signInButtons[signInButtons.length - 1]); // Press the button, not the title

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should show error when fields are empty', () => {
    const { showAlert } = require('../../utils/alertHelper');
    const { getAllByText } = render(
      <TestWrapper>
        <SignInScreen />
      </TestWrapper>
    );

    const signInButtons = getAllByText('auth.signIn');
    fireEvent.press(signInButtons[signInButtons.length - 1]); // Press the button

    expect(showAlert).toHaveBeenCalled();
  });

  it('should fill admin credentials when admin button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <SignInScreen />
      </TestWrapper>
    );

    fireEvent.press(getByText('auth.useAdminAccount'));

    expect(getByPlaceholderText('auth.email').props.value).toBe('admin@taskmanager.com');
    expect(getByPlaceholderText('auth.password').props.value).toBe('admin123');
  });

  it('should fill member credentials when member button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <SignInScreen />
      </TestWrapper>
    );

    fireEvent.press(getByText('auth.useMemberAccount'));

    expect(getByPlaceholderText('auth.email').props.value).toBe('user@taskmanager.com');
    expect(getByPlaceholderText('auth.password').props.value).toBe('user123');
  });
});

