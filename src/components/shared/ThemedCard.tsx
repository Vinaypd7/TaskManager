import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ThemedCardProps {
  children: React.ReactNode;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * ThemedCard
 *
 * Card wrapper that applies theme-aware background, border radius and
 * elevation. Accepts an `elevated` flag to toggle stronger shadow styles.
 */
export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  elevated = false,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated
            ? theme.colors.surface.cardElevated
            : theme.colors.surface.card,
          borderRadius: theme.borderRadius.md,
          ...(elevated ? theme.shadows.md : theme.shadows.sm),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
