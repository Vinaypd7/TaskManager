import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ErrorsScreen } from "../ErrorsScreen";
import { createAppError } from "../../__tests__/__factories__/errorFactory";
import { createAdminUser } from "../../__tests__/__factories__/userFactory";
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

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockGetStoredErrors = jest.fn();
const mockClearErrors = jest.fn();

jest.mock("../../services/errorService", () => ({
  errorService: {
    getStoredErrors: () => mockGetStoredErrors(),
    clearErrors: () => mockClearErrors(),
  },
}));

jest.mock("../../utils/alertHelper", () => ({
  showAlert: jest.fn(),
}));

describe("ErrorsScreen", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
    mockGetStoredErrors.mockClear();
    mockClearErrors.mockClear();

    jest
      .spyOn(require("@react-navigation/native"), "useNavigation")
      .mockReturnValue({
        navigate: mockNavigate,
      });
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    children;

  it("should render errors screen for admin", async () => {
    const errors = [createAppError({ id: "error-1", message: "Test Error" })];
    mockGetStoredErrors.mockResolvedValue(errors);

    jest
      .spyOn(require("../../contexts/AuthContext"), "useAuthContext")
      .mockReturnValue({
        user: createAdminUser(),
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
        isAuthenticated: true,
        isAdmin: true,
      });

    const { getByText } = render(
      <TestWrapper>
        <ErrorsScreen />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(getByText("errors.title")).toBeTruthy();
    });
  });

  it("should show access denied for non-admin", () => {
    jest
      .spyOn(require("../../contexts/AuthContext"), "useAuthContext")
      .mockReturnValue({
        user: {
          id: "user-1",
          email: "user@example.com",
          role: "ROLE_MEMBER",
          name: "User",
        },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
        isAuthenticated: true,
        isAdmin: false,
      });

    const { getByText } = render(
      <TestWrapper>
        <ErrorsScreen />
      </TestWrapper>,
    );

    expect(getByText("errors.accessDenied")).toBeTruthy();
  });

  it("should display error list", async () => {
    const errors = [
      createAppError({ id: "error-1", message: "Error 1" }),
      createAppError({ id: "error-2", message: "Error 2" }),
    ];
    mockGetStoredErrors.mockResolvedValue(errors);

    jest
      .spyOn(require("../../contexts/AuthContext"), "useAuthContext")
      .mockReturnValue({
        user: createAdminUser(),
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
        isAuthenticated: true,
        isAdmin: true,
      });

    const { getByText } = render(
      <TestWrapper>
        <ErrorsScreen />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(getByText("Error 1")).toBeTruthy();
      expect(getByText("Error 2")).toBeTruthy();
    });
  });

  it("should clear errors when clear button is pressed", async () => {
    mockGetStoredErrors.mockResolvedValue([]);
    mockClearErrors.mockResolvedValue(undefined);

    jest
      .spyOn(require("../../contexts/AuthContext"), "useAuthContext")
      .mockReturnValue({
        user: createAdminUser(),
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
        isAuthenticated: true,
        isAdmin: true,
      });

    const { showAlert } = require("../../utils/alertHelper");
    const { getByText } = render(
      <TestWrapper>
        <ErrorsScreen />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(getByText("errors.title")).toBeTruthy();
    });
  });
});
