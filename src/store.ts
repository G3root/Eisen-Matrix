import create from "zustand";
import { EinsenMatrixState, Theme } from "./types";
import { persist, StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      toggleTheme: () => {
        const current = get().isDark;
        return set({ isDark: !current });
      },
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
        set({
          data: {
            ...get().data,
            [key]: { ...rest },
          },
        }),
      updateProject: ({ key, ...rest }) => {
        const data = get().data;
        const entries = {
          ...data,
          [key]: { ...data[key], ...rest },
        };
        return set({
          data: entries,
        });
      },
      deleteProject: ({ key }) => {
        const entries = get().data;
        delete entries[key];

        return set({ data: entries });
      },
      toggleCompleteProject: ({ projectKey }) => {
        const data = get().data;
        const currentState = get().data[projectKey].isCompleted;
        const clone = { ...data };
        clone[projectKey].isCompleted = !currentState;
        return set({
          data: clone,
        });
      },
      addTask: ({ projectKey, priorityKey, taskKey, ...rest }) => {
        const data = get().data;
        const entries = {
          ...data,
          [projectKey]: {
            ...data[projectKey],
            tasks: {
              ...data[projectKey].tasks,
              [priorityKey]: {
                ...data[projectKey].tasks[priorityKey],
                [taskKey]: { ...rest },
              },
            },
          },
        };
        return set({
          data: entries,
        });
      },
      updateTask: ({ projectKey, priorityKey, taskKey, ...rest }) => {
        const data = get().data;
        const entries = {
          ...data,
          [projectKey]: {
            ...data[projectKey],
            tasks: {
              ...data[projectKey].tasks,
              [priorityKey]: {
                ...data[projectKey].tasks[priorityKey],
                [taskKey]: {
                  ...data[projectKey].tasks[priorityKey][taskKey],
                  ...rest,
                },
              },
            },
          },
        };
        return set({
          data: entries,
        });
      },
      toggleComplete: ({ projectKey, priorityKey, taskKey }) => {
        const data = get().data;
        const currentState =
          data[projectKey].tasks[priorityKey][taskKey].isCompleted;
        const clone = { ...data };
        clone[projectKey].tasks[priorityKey][taskKey].isCompleted =
          !currentState;
        return set({
          data: clone,
        });
      },
      deleteTask: ({ projectKey, priorityKey, taskKey }) => {
        const data = get().data;
        const clone = { ...data };
        delete clone[projectKey].tasks[priorityKey][taskKey];
        return set({
          data: clone,
        });
      },
    }),

    {
      name: "einsen-state",
      getStorage: () => storage,
    }
  )
);
