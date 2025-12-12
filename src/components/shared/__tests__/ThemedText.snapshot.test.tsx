import React from 'react';
import renderer from 'react-test-renderer';
import { act } from '@testing-library/react-native';
import { ThemedText } from '../ThemedText';

jest.mock('../../../contexts/ThemeContext', () => {
  const React = require('react');
  const { createContext } = React;
  const ThemeContext = createContext({
    theme: require('../../../constants/theme').lightTheme,
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

describe('ThemedText Snapshot Tests', () => {
  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => children;

  it('should match snapshot for primary text', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <ThemedText>Primary Text</ThemedText>
          </TestWrapper>
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for secondary text', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <ThemedText variant="secondary">Secondary Text</ThemedText>
          </TestWrapper>
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for error text', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <ThemedText variant="error">Error Text</ThemedText>
          </TestWrapper>
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for large text', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <ThemedText size="xl" weight="bold">
              Large Bold Text
            </ThemedText>
          </TestWrapper>
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});

