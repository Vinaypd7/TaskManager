import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationProvider } from "../contexts/LocalizationContext";
import { ThemeProvider } from "../contexts/ThemeContext";

interface StorybookProvidersProps {
  children: React.ReactNode;
}

export const StorybookProviders: React.FC<StorybookProvidersProps> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <AuthProvider>{children}</AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
