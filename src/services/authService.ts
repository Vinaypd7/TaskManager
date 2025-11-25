import { User } from "../types";

/**
 * authService
 *
 * Simple mock authentication service used in the demo app. Methods
 * simulate network delay and return static user objects for known
 * credentials. Replace with real API calls in production.
 */
export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@taskmanager.com" && password === "admin123") {
      return {
        id: "1",
        email: "admin@taskmanager.com",
        role: "ROLE_ADMIN",
        name: "Admin User",
      };
    } else if (email === "user@taskmanager.com" && password === "user123") {
      return {
        id: "2",
        email: "user@taskmanager.com",
        role: "ROLE_MEMBER",
        name: "Regular User",
      };
    }

    throw new Error("Invalid credentials");
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};
