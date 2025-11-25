/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { TasksScreen } from "../TasksScreen";
import { createTask } from "../../__tests__/__factories__/taskFactory";
import { createUser } from "../../__tests__/__factories__/userFactory";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

jest.mock("../../hooks/useErrorHandler", () => ({
  useErrorHandler: () => ({
    handleError: jest.fn(),
  }),
}));

jest.mock("../../hooks/useTasks", () => ({
  useTasks: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    push: jest.fn(),
    navigate: jest.fn(),
  }),
}));

jest.mock("../../utils/alertHelper", () => ({
  showAlert: jest.fn(),
}));

describe("TasksScreen", () => {
  const mockAddTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleTaskCompletion = jest.fn();
  const mockSetFilters = jest.fn();
  const mockRefreshTasks = jest.fn();
  const mockNavigation = {
    push: jest.fn(),
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();

    jest
      .spyOn(require("../../contexts/AuthContext"), "useAuthContext")
      .mockReturnValue({
        user: createUser(),
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
        isAuthenticated: true,
        isAdmin: false,
      });

    jest
      .spyOn(require("@react-navigation/native"), "useNavigation")
      .mockReturnValue(mockNavigation);

    jest
      .spyOn(require("../../hooks/useFeatureFlags"), "useFeatureFlags")
      .mockReturnValue({
        flags: { enableTaskSearch: true },
        loading: false,
        isFeatureEnabled: (feature: string) => feature === "enableTaskSearch",
        refreshFlags: jest.fn(),
      });

    jest.spyOn(require("../../hooks/useTasks"), "useTasks").mockReturnValue({
      tasks: [],
      allTasks: [],
      loading: false,
      pagination: { page: 1, limit: 5 },
      totalTasks: 0,
      addTask: mockAddTask,
      deleteTask: mockDeleteTask,
      toggleTaskCompletion: mockToggleTaskCompletion,
      setPagination: jest.fn(),
      setFilters: mockSetFilters,
      refreshTasks: mockRefreshTasks,
    });
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    children;

  it("should render tasks screen", () => {
    const { getByText } = render(
      <TestWrapper>
        <TasksScreen />
      </TestWrapper>,
    );

    expect(getByText("tasks.title")).toBeTruthy();
  });

  it("should show add task form when add button is pressed", () => {
    const { getByText } = render(
      <TestWrapper>
        <TasksScreen />
      </TestWrapper>,
    );

    fireEvent.press(getByText("tasks.addTask"));
    expect(getByText("common.cancel")).toBeTruthy();
  });

  it("should add task when form is submitted", async () => {
    mockAddTask.mockResolvedValue(undefined);

    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <TasksScreen />
      </TestWrapper>,
    );

    fireEvent.press(getByText("tasks.addTask"));
    fireEvent.changeText(getByPlaceholderText("tasks.taskTitle"), "New Task");
    fireEvent.changeText(
      getByPlaceholderText("tasks.taskDescription"),
      "New Description",
    );
    fireEvent.press(getByText("tasks.addTask"));

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith("New Task", "New Description");
    });
  });

  it("should display tasks list", () => {
    const tasks = [createTask({ id: "1", title: "Task 1" })];
    jest.spyOn(require("../../hooks/useTasks"), "useTasks").mockReturnValue({
      tasks,
      allTasks: tasks,
      loading: false,
      pagination: { page: 1, limit: 5 },
      totalTasks: 1,
      addTask: mockAddTask,
      deleteTask: mockDeleteTask,
      toggleTaskCompletion: mockToggleTaskCompletion,
      setPagination: jest.fn(),
      setFilters: mockSetFilters,
      refreshTasks: mockRefreshTasks,
    });

    const { getByLabelText } = render(
      <TestWrapper>
        <TasksScreen />
      </TestWrapper>,
    );

    // Task text is hidden from accessibility tree by parent, so we check the accessibility label instead
    expect(getByLabelText("Task 1, pending")).toBeTruthy();
  });

  it("should filter tasks by search query", () => {
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <TasksScreen />
      </TestWrapper>,
    );

    const searchInput = getByPlaceholderText("tasks.searchPlaceholder");
    fireEvent.changeText(searchInput, "test");

    expect(mockSetFilters).toHaveBeenCalledWith({ search: "test" });
  });
});
