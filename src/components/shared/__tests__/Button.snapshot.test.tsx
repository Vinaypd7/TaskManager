import React from "react";
import renderer from "react-test-renderer";
import { act } from "@testing-library/react-native";
import { Button } from "../Button";

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

describe("Button Snapshot Tests", () => {
  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    children;

  it("should match snapshot for primary button", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <Button
              title="Primary Button"
              onPress={jest.fn()}
              variant="primary"
            />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for secondary button", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <Button
              title="Secondary Button"
              onPress={jest.fn()}
              variant="secondary"
            />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for disabled button", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <Button title="Disabled Button" onPress={jest.fn()} disabled />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for button with custom style", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <Button
              title="Styled Button"
              onPress={jest.fn()}
              style={{ marginTop: 20, padding: 10 }}
            />
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});
