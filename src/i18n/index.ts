import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const translations = {
  en: {
    tasks: {
      title: 'Tasks',
      addTask: 'Add Task',
      editTask: 'Edit Task',
      deleteTask: 'Delete Task',
      markComplete: 'Mark Complete',
      markIncomplete: 'Mark Incomplete',
      noTasks: 'No tasks found',
      completed: 'Completed',
      pending: 'Pending',
    },
    auth: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
      invalidCredentials: 'Invalid credentials',
    },
    errors: {
      title: 'Errors',
      noErrors: 'No errors logged',
    },
    common: {
      loading: 'Loading...',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
    },
  },
  es: {
    tasks: {
      title: 'Tareas',
      addTask: 'Agregar Tarea',
      editTask: 'Editar Tarea',
      deleteTask: 'Eliminar Tarea',
      markComplete: 'Marcar como Completada',
      markIncomplete: 'Marcar como Incompleta',
      noTasks: 'No se encontraron tareas',
      completed: 'Completada',
      pending: 'Pendiente',
    },
    auth: {
      signIn: 'Iniciar Sesión',
      signOut: 'Cerrar Sesión',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      invalidCredentials: 'Credenciales inválidas',
    },
    errors: {
      title: 'Errores',
      noErrors: 'No hay errores registrados',
    },
    common: {
      loading: 'Cargando...',
      submit: 'Enviar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
    },
  },
};

export const i18n = new I18n(translations);

// Set the locale from storage or default to 'en'
export const initI18n = async () => {
  try {
    const savedLocale = await AsyncStorage.getItem('user_locale');
    i18n.locale = savedLocale || 'en';
  } catch (error) {
    console.error('Failed to load locale:', error);
    i18n.locale = 'en';
  }
};

export const setLocale = async (locale: string) => {
  try {
    i18n.locale = locale;
    await AsyncStorage.setItem('user_locale', locale);
  } catch (error) {
    console.error('Failed to save locale:', error);
  }
};