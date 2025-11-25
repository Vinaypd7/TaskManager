import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { TaskForm } from "../TaskForm";
import { TextInput } from "react-native";

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

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const { ThemeProvider } = require("../../contexts/ThemeContext");
    return <ThemeProvider>{children}</ThemeProvider>;
  };

  it("should render form fields", () => {
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <TaskForm onSubmit={mockOnSubmit} />
      </TestWrapper>,
    );

    expect(getByPlaceholderText("tasks.taskTitle")).toBeTruthy();
    expect(getByPlaceholderText("tasks.taskDescription")).toBeTruthy();
  });

  it("should submit form with valid data", async () => {
    mockOnSubmit.mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(
      <TestWrapper>
        <TaskForm onSubmit={mockOnSubmit} />
      </TestWrapper>,
    );

    const titleInput = getByPlaceholderText("tasks.taskTitle");
    const descriptionInput = getByPlaceholderText("tasks.taskDescription");
    const submitButton = getByText("tasks.addTask");

    fireEvent.changeText(titleInput, "Test Task");
    fireEvent.changeText(descriptionInput, "Test Description");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Test Task",
        description: "Test Description",
      });
    });
  });

  it("should show validation errors for empty fields", async () => {
    const { getByText } = render(
      <TestWrapper>
        <TaskForm onSubmit={mockOnSubmit} />
      </TestWrapper>,
    );

    const submitButton = getByText("tasks.addTask");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("should show validation error for short title", async () => {
    const { getByPlaceholderText, getByText } = render(
      <TestWrapper>
        <TaskForm onSubmit={mockOnSubmit} />
      </TestWrapper>,
    );

    const titleInput = getByPlaceholderText("tasks.taskTitle");
    fireEvent.changeText(titleInput, "AB");
    fireEvent.press(getByText("tasks.addTask"));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("should populate form with initial data", () => {
    const initialData = {
      title: "Initial Title",
      description: "Initial Description",
    };

    const { getByDisplayValue } = render(
      <TestWrapper>
        <TaskForm onSubmit={mockOnSubmit} initialData={initialData} />
      </TestWrapper>,
    );

    expect(getByDisplayValue("Initial Title")).toBeTruthy();
    expect(getByDisplayValue("Initial Description")).toBeTruthy();
  });

  it("should call onCancel when cancel button is pressed", () => {
    const { getByText } = render(
      <TestWrapper>
        <TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </TestWrapper>,
    );

    fireEvent.press(getByText("common.cancel"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("should disable inputs when loading", () => {
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <TaskForm onSubmit={mockOnSubmit} loading />
      </TestWrapper>,
    );

    const titleInput = getByPlaceholderText("tasks.taskTitle");
    expect(titleInput.props.editable).toBe(false);
  });
});
