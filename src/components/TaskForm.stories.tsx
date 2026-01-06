import React from "react";
import { View, StyleSheet } from "react-native";
import { TaskForm } from "./TaskForm";
import type { Meta, StoryObj } from "@storybook/react-native";
import { StorybookProviders } from "./StorybookProviders";
import { showAlert } from "../utils/alertHelper";

// Create a wrapper component that provides all necessary contexts
const TaskFormWithProviders = (props: any) => (
  <StorybookProviders>
    <TaskForm {...props} />
  </StorybookProviders>
);

const meta: Meta<typeof TaskFormWithProviders> = {
  title: "Components/TaskForm",
  component: TaskFormWithProviders,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TaskFormWithProviders>;

export const Default: Story = {
  args: {
    onSubmit: async (data) => {
      showAlert(
        "Form Submitted",
        `Title: ${data.title}\nDescription: ${data.description}`,
      );
    },
    loading: false,
  },
};

export const WithInitialData: Story = {
  args: {
    onSubmit: async (data) => {
      showAlert(
        "Form Submitted",
        `Title: ${data.title}\nDescription: ${data.description}`,
      );
    },
    initialData: {
      title: "Existing Task",
      description: "This is an existing task description",
    },
    loading: false,
  },
};

export const LoadingState: Story = {
  args: {
    onSubmit: async (data) => {
      // Simulate slow submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showAlert(
        "Form Submitted",
        `Title: ${data.title}\nDescription: ${data.description}`,
      );
    },
    loading: true,
  },
};

export const WithCancel: Story = {
  args: {
    onSubmit: async (data) => {
      showAlert(
        "Form Submitted",
        `Title: ${data.title}\nDescription: ${data.description}`,
      );
    },
    onCancel: () => showAlert("Cancelled", "Form cancellation pressed"),
    loading: false,
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
  },
});
