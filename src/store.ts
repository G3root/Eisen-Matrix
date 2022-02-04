import create from "zustand";
import { EinsenMatrixState } from "./types";
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
      deleteProject: ({ key }) => {
        const entries = get().data;
        delete entries[key];

        return set({ data: entries });
      },
    }),
    {
      name: "einsen-state",
      getStorage: () => storage,
    }
  )
);
