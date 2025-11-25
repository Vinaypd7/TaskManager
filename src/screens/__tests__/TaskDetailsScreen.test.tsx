import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { TaskDetailsScreen } from "../TaskDetailsScreen";
import { createTask } from "../../__tests__/__factories__/taskFactory";

jest.mock("../../contexts/AuthContext", () => {
  const React = require("react");
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
      const context = require("react").useContext(AuthContext);
      if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
      }
      return context;
    },
  };
});

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

jest.mock("../../hooks/useTasks", () => ({
  useTasks: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
    canGoBack: jest.fn(() => true),
  }),
  useRoute: () => ({
    params: { taskId: "task-1" },
  }),
}));

jest.mock("../../utils/alertHelper", () => ({
  showAlert: jest.fn(),
}));

describe("TaskDetailsScreen", () => {
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleTaskCompletion = jest.fn();
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(require("@react-navigation/native"), "useNavigation")
      .mockReturnValue({
        goBack: mockGoBack,
        canGoBack: jest.fn(() => true),
      });

    jest.spyOn(require("../../hooks/useTasks"), "useTasks").mockReturnValue({
      allTasks: [createTask({ id: "task-1", title: "Test Task" })],
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
      toggleTaskCompletion: mockToggleTaskCompletion,
    });
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    children;

  it("should render task details", () => {
    const { getByText } = render(
      <TestWrapper>
        <TaskDetailsScreen />
      </TestWrapper>,
    );

    expect(getByText("Test Task")).toBeTruthy();
  });

  it("should show edit form when edit button is pressed", () => {
    const { getByText } = render(
      <TestWrapper>
        <TaskDetailsScreen />
      </TestWrapper>,
    );

    fireEvent.press(getByText("tasks.editTask"));
    expect(getByText("tasks.editTask")).toBeTruthy();
  });

  it("should update task when form is submitted", async () => {
    mockUpdateTask.mockResolvedValue(undefined);

    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <TaskDetailsScreen />
      </TestWrapper>,
    );

    fireEvent.press(getByText("tasks.editTask"));
    fireEvent.changeText(
      getByPlaceholderText("tasks.taskTitle"),
      "Updated Task",
    );
    fireEvent.changeText(
      getByPlaceholderText("tasks.taskDescription"),
      "Updated Description",
    );
    fireEvent.press(getByText("common.save"));

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith("task-1", {
        title: "Updated Task",
        description: "Updated Description",
      });
    });
  });

  it("should toggle task completion", async () => {
    mockToggleTaskCompletion.mockResolvedValue(undefined);

    const { getByText } = render(
      <TestWrapper>
        <TaskDetailsScreen />
      </TestWrapper>,
    );

    fireEvent.press(getByText("tasks.markComplete"));

    await waitFor(() => {
      expect(mockToggleTaskCompletion).toHaveBeenCalledWith("task-1");
    });
  });

  it("should show not found message when task does not exist", () => {
    jest.spyOn(require("../../hooks/useTasks"), "useTasks").mockReturnValue({
      allTasks: [],
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
      toggleTaskCompletion: mockToggleTaskCompletion,
    });

    const { getByText } = render(
      <TestWrapper>
        <TaskDetailsScreen />
      </TestWrapper>,
    );

    expect(getByText("tasks.taskNotFound")).toBeTruthy();
  });
});
