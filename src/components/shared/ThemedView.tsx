import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedViewProps extends ViewProps {
  background?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "inverse"
    | "surface"
    | "card";
  children?: React.ReactNode;
}

/**
 * ThemedView
 *
 * Provides a SafeAreaView + themed background color. Use as the root view
 * for screens to ensure consistent background and safe area handling.
 */
export const ThemedView: React.FC<ThemedViewProps> = ({
  background = "primary",
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    switch (background) {
      case "secondary":
        return theme.colors.background.secondary;
      case "tertiary":
        return theme.colors.background.tertiary;
      case "inverse":
        return theme.colors.background.inverse;
      case "surface":
        return theme.colors.surface.primary;
      case "card":
        return theme.colors.surface.card;
      default:
        return theme.colors.background.primary;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: getBackgroundColor() }}>
      <View style={[style]} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};
