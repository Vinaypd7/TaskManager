import React from "react";
import renderer from "react-test-renderer";
import { act } from "@testing-library/react-native";
import { TaskForm } from "../TaskForm";

jest.mock("../../contexts/ThemeContext", () => {
  const React = require("react");
  const { createContext } = React;
  const ThemeContext = createContext({
    theme: require("../../constants/theme").lightTheme,
    themeMode: "light",
    isDark: false,
    toggleTheme: jest.fn(),
    setThemeMode: jest.fn(),
    loading: false,
  });

  return {
    ThemeContext,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: () => {
      const context = require("react").useContext(ThemeContext);
      if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
      }
      return context;
    },
  };
});

jest.mock("../../hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    locale: "en",
    changeLanguage: jest.fn(),
    loading: false,
  }),
}));

describe("TaskForm Snapshot Tests", () => {
  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    children;
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot for empty form", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <TaskForm onSubmit={mockOnSubmit} />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for form with initial data", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <TaskForm
              onSubmit={mockOnSubmit}
              initialData={{
                title: "Existing Task",
                description: "Existing Description",
              }}
            />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for form with cancel button", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <TaskForm onSubmit={mockOnSubmit} onCancel={jest.fn()} />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for loading form", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <TaskForm onSubmit={mockOnSubmit} loading />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});
