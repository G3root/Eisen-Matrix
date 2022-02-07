import create from "zustand";
import { EinsenMatrixState, Theme } from "./types";
import { persist, StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import produce from "immer";

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await AsyncStorage.getItem(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};

export const useTheme = create<Theme>(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () =>
        set(
          produce((state: Theme) => {
            state.isDark = !state.isDark;
          })
        ),
    }),

    {
      name: "theme",
      getStorage: () => storage,
    }
  )
);

export const useStore = create<EinsenMatrixState>(
  persist(
    (set, get) => ({
      data: {},
      createProject: ({ key, ...rest }) =>
        set(
          produce((state: EinsenMatrixState) => {
            state.data[key] = { ...rest };
          })
        ),
      updateProject: ({ key, ...rest }) =>
        set(
          produce((state: EinsenMatrixState) => {
            state.data[key] = { ...state.data[key], ...rest };
          })
        ),
      deleteProject: ({ key }) =>
        set(
          produce((state: EinsenMatrixState) => {
            delete state.data[key];
          })
        ),
      toggleCompleteProject: ({ projectKey }) =>
        set(
          produce((state: EinsenMatrixState) => {
            state.data[projectKey].isCompleted =
              !state.data[projectKey].isCompleted;
          })
        ),
      addTask: ({ projectKey, priorityKey, taskKey, ...rest }) =>
        set(
          produce((state: EinsenMatrixState) => {
            state.data[projectKey].tasks[priorityKey][taskKey] = { ...rest };
          })
        ),
      updateTask: ({ projectKey, priorityKey, taskKey, ...rest }) =>
        set(
          produce((state: EinsenMatrixState) => {
            state.data[projectKey].tasks[priorityKey][taskKey] = {
              ...state.data[projectKey].tasks[priorityKey][taskKey],
              ...rest,
            };
          })
        ),
      toggleTaskComplete: ({ projectKey, priorityKey, taskKey }) =>
        set(
          produce((state: EinsenMatrixState) => {
            state.data[projectKey].tasks[priorityKey][taskKey].isCompleted =
              !state.data[projectKey].tasks[priorityKey][taskKey].isCompleted;
          })
        ),
      deleteTask: ({ projectKey, priorityKey, taskKey }) =>
        set(
          produce((state: EinsenMatrixState) => {
            delete state.data[projectKey].tasks[priorityKey][taskKey];
          })
        ),
    }),
    {
      name: "einsen-state",
      getStorage: () => storage,
    }
  )
);
