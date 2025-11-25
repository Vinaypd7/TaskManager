import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button";
import { mockThemeContext } from "../../../__tests__/__mocks__/contexts.mock";
import { ThemeProvider } from "../../../contexts/ThemeContext";

jest.mock("../../../contexts/ThemeContext", () => {
  const React = require("react");
  const { createContext } = React;
  const ThemeContext = createContext({
    theme: require("../../../constants/theme").lightTheme,
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

describe("Button", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const { ThemeProvider } = require("../../../contexts/ThemeContext");
    return <ThemeProvider>{children}</ThemeProvider>;
  };

  it("should render button with title", () => {
    const { getByText } = render(
      <TestWrapper>
        <Button title="Test Button" onPress={jest.fn()} />
      </TestWrapper>,
    );

    expect(getByText("Test Button")).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <Button title="Test Button" onPress={onPress} />
      </TestWrapper>,
    );

    fireEvent.press(getByText("Test Button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("should not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <Button title="Test Button" onPress={onPress} disabled />
      </TestWrapper>,
    );

    fireEvent.press(getByText("Test Button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("should render primary variant", () => {
    const { getByText } = render(
      <TestWrapper>
        <Button title="Primary Button" onPress={jest.fn()} variant="primary" />
      </TestWrapper>,
    );

    expect(getByText("Primary Button")).toBeTruthy();
  });

  it("should render secondary variant", () => {
    const { getByText } = render(
      <TestWrapper>
        <Button
          title="Secondary Button"
          onPress={jest.fn()}
          variant="secondary"
        />
      </TestWrapper>,
    );

    expect(getByText("Secondary Button")).toBeTruthy();
  });

  it("should apply custom style", () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <TestWrapper>
        <Button title="Styled Button" onPress={jest.fn()} style={customStyle} />
      </TestWrapper>,
    );

    expect(getByText("Styled Button")).toBeTruthy();
  });
});
