import { renderHook, waitFor, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTasks } from "../useTasks";
import { createTask } from "../../__tests__/__factories__/taskFactory";
import { createUser } from "../../__tests__/__factories__/userFactory";
import React from "react";

// Mock the auth context
const mockAuthValue = {
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
};

jest.mock("../../contexts/AuthContext", () => {
  const React = require("react");
  const { createContext } = React;
  const AuthContext = createContext(mockAuthValue);

  return {
    AuthContext,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuthContext: () => mockAuthValue,
  };
});

describe("useTasks", () => {
  beforeEach(() => {
    AsyncStorage.clear();
    jest.clearAllMocks();
    // Reset mock auth value
    mockAuthValue.user = null;
    mockAuthValue.loading = false;
    mockAuthValue.isAuthenticated = false;
    mockAuthValue.isAdmin = false;
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(React.Fragment, null, children);
  };

  it("should load tasks for user", async () => {
    const user = createUser({ id: "user-1" });
    const task = createTask({ userId: "user-1" });
    await AsyncStorage.setItem("user_tasks", JSON.stringify([task]));

    mockAuthValue.user = user;
    mockAuthValue.isAuthenticated = true;

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.allTasks).toHaveLength(1);
  });

  it("should add task", async () => {
    const user = createUser({ id: "user-1" });
    mockAuthValue.user = user;
    mockAuthValue.isAuthenticated = true;

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.addTask("New Task", "New Description");
    });

    await waitFor(() => {
      expect(result.current.allTasks.length).toBeGreaterThan(0);
    });
  });

  it("should delete task", async () => {
    const user = createUser({ id: "user-1" });
    const task = createTask({ id: "task-1", userId: "user-1" });
    await AsyncStorage.setItem("user_tasks", JSON.stringify([task]));

    mockAuthValue.user = user;
    mockAuthValue.isAuthenticated = true;

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.deleteTask("task-1");
    });

    await waitFor(() => {
      expect(result.current.allTasks).toHaveLength(0);
    });
  });

  it("should toggle task completion", async () => {
    const user = createUser({ id: "user-1" });
    const task = createTask({
      id: "task-1",
      userId: "user-1",
      completed: false,
    });
    await AsyncStorage.setItem("user_tasks", JSON.stringify([task]));

    mockAuthValue.user = user;
    mockAuthValue.isAuthenticated = true;

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.toggleTaskCompletion("task-1");
    });

    await waitFor(() => {
      expect(result.current.allTasks[0].completed).toBe(true);
    });
  });

  it("should filter tasks by search query", async () => {
    const user = createUser({ id: "user-1" });
    const task1 = createTask({
      id: "task-1",
      userId: "user-1",
      title: "Task One",
    });
    const task2 = createTask({
      id: "task-2",
      userId: "user-1",
      title: "Task Two",
    });
    await AsyncStorage.setItem("user_tasks", JSON.stringify([task1, task2]));

    mockAuthValue.user = user;
    mockAuthValue.isAuthenticated = true;

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilters({ search: "One" });
    });

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(1);
      expect(result.current.tasks[0].title).toBe("Task One");
    });
  });
});
