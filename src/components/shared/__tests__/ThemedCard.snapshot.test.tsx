import React from "react";
import renderer from "react-test-renderer";
import { act } from "@testing-library/react-native";
import { ThemedCard } from "../ThemedCard";
import { Text } from "react-native";

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

describe("ThemedCard Snapshot Tests", () => {
  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    children;

  it("should match snapshot for basic themed card", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <ThemedCard>
              <Text>Themed Card Content</Text>
            </ThemedCard>
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for elevated themed card", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <ThemedCard elevated>
              <Text>Elevated Card</Text>
            </ThemedCard>
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot for themed card with custom style", () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <TestWrapper>
            <ThemedCard style={{ padding: 20 }}>
              <Text>Custom Styled Card</Text>
            </ThemedCard>
          </TestWrapper>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});
