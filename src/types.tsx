/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  aboutModal: undefined;
  projectModal: undefined;
  taskModal: { key: string };
  projectDetail: { key: string; title: string };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export interface TaskItem {
  title: string;
  description: string;
  category: string;
  urgency: number;
  importance: number;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Project {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt?: Date;
  tasks: {
    //   * task priority Table
    //   * Urgent -> 4
    //   * Important -> 3
    //   * Delegate -> 2
    //   * Dump -> 1
    1: { [key: string]: TaskItem };
    2: { [key: string]: TaskItem };
    3: { [key: string]: TaskItem };
    4: { [key: string]: TaskItem };
  };
}

type PriorityTable = 1 | 2 | 3 | 4;

export interface EinsenMatrixState {
  data: {
    [key: string]: Project;
  };
  createProject: (data: Project & { key: string }) => void;
  deleteProject: (data: { key: string }) => void;
  addTask: (
    data: {
      projectKey: string;
      priorityKey: PriorityTable;
      taskKey: string;
    } & TaskItem
  ) => void;
}
