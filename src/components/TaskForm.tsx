import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "./shared/Button";
import { ThemedCard } from "./shared/ThemedCard";
import { ThemedText } from "./shared/ThemedText";
import { useTranslation } from "../hooks/useTranslation";
import { useTheme } from "../contexts/ThemeContext";
import { TaskFormData } from "../types";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  initialData?: TaskFormData;
  loading?: boolean;
  onCancel?: () => void;
}

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required"),
});

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
  loading = false,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const title = watch("title");
  const description = watch("description");

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      await onSubmit(data);
      // Reset form after successful submission if no initial data (meaning it's a new task)
      if (!initialData) {
        setValue("title", "");
        setValue("description", "");
      }
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <ThemedCard>
      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.background.primary,
              borderColor: errors.title
                ? theme.colors.error[500]
                : theme.colors.border.primary,
              color: theme.colors.text.primary,
            },
          ]}
          placeholder={t("tasks.taskTitle")}
          placeholderTextColor={theme.colors.text.tertiary}
          value={title}
          onChangeText={(text) => setValue("title", text)}
          editable={!loading}
          accessible={true}
          accessibilityLabel={t("tasks.taskTitle")}
          accessibilityHint={
            t("tasks.taskTitleHint") || "Enter the title for your task"
          }
          accessibilityRole="text"
          aria-required={true}
        />
        {errors.title && (
          <ThemedText
            variant="error"
            size="sm"
            style={styles.errorText}
            accessible={true}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {errors.title.message}
          </ThemedText>
        )}

        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: theme.colors.background.primary,
              borderColor: errors.description
                ? theme.colors.error[500]
                : theme.colors.border.primary,
              color: theme.colors.text.primary,
            },
          ]}
          placeholder={t("tasks.taskDescription")}
          placeholderTextColor={theme.colors.text.tertiary}
          value={description}
          onChangeText={(text) => setValue("description", text)}
          multiline
          numberOfLines={3}
          editable={!loading}
          accessible={true}
          accessibilityLabel={t("tasks.taskDescription")}
          accessibilityHint={
            t("tasks.taskDescriptionHint") ||
            "Enter a detailed description for your task"
          }
          accessibilityRole="text"
          aria-required={true}
        />
        {errors.description && (
          <ThemedText
            variant="error"
            size="sm"
            style={styles.errorText}
            accessible={true}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {errors.description.message}
          </ThemedText>
        )}

        <View
          style={styles.buttonContainer}
          accessible={true}
          accessibilityRole="group"
          accessibilityLabel="Form actions"
        >
          {onCancel && (
            <Button
              title={t("common.cancel")}
              onPress={onCancel}
              variant="secondary"
              style={styles.cancelButton}
              disabled={loading}
              accessibilityHint="Cancel and close the form"
            />
          )}
          <Button
            title={
              loading
                ? t("common.loading")
                : initialData
                  ? t("common.save")
                  : t("tasks.addTask")
            }
            onPress={handleSubmit(handleFormSubmit)}
            disabled={loading}
            style={styles.submitButton}
            accessibilityHint={
              loading
                ? "Form is being submitted"
                : initialData
                  ? "Save changes to the task"
                  : "Add a new task"
            }
          />
        </View>
      </View>
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  errorText: {
    marginTop: -8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 2,
  },
});
