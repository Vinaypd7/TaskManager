import { initializeApp } from "firebase/app";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyBbtFqduXuxUH4c_LvptgplufTgVjveEDA",
  authDomain: "taskmanager-surest.firebaseapp.com",
  projectId: "taskmanager-surest",
  storageBucket: "taskmanager-surest.firebasestorage.app",
  messagingSenderId: "800384546172",
  appId: "1:800384546172:web:79a006c917c7ed270720f9",
  measurementId: "G-PQZS2N3BFM",
};

const app = initializeApp(firebaseConfig);

export const remoteConfig = getRemoteConfig(app);

// Developer-friendly settings
remoteConfig.settings.minimumFetchIntervalMillis = 5000;

// Default values inside the app
remoteConfig.defaultConfig = {
  enablePreferences: false,
  enableAppearance: false,
  enableTaskSearch: false,
};

export default app;
