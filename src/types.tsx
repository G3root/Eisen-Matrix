/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import "@emotion/react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  aboutModal: undefined;
  projectEditModal: { projectKey: string; title: string };
  projectCreateModal: undefined;
  taskCreateModal: { key: string };
  taskEditModal: {
    projectKey: string;
    matrixKey: 1 | 2 | 3 | 4;
    taskKey: string;
    title: string;
  };
  projectDetail: { key: string; title: string };
  taskList: { projectKey: string; matrixKey: 1 | 2 | 3 | 4 };
  taskDetail: {
    title: string;
    projectKey: string;
    matrixKey: 1 | 2 | 3 | 4;
    taskKey: string;
  };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export interface TaskItem {
  title: string;
  emoji: string;
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
  emoji: string;
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

export type PriorityTableKey = 1 | 2 | 3 | 4;

export interface EinsenMatrixState {
  data: {
    [key: string]: Project;
  };
  createProject: (data: Project & { key: string }) => void;
  deleteProject: (data: { key: string }) => void;
  updateProject: (data: Partial<Project> & { key: string }) => void;
  toggleCompleteProject: (data: { projectKey: string }) => void;
  addTask: (
    data: {
      projectKey: string;
      priorityKey: PriorityTableKey;
      taskKey: string;
    } & TaskItem
  ) => void;
  updateTask: (
    data: {
      projectKey: string;
      priorityKey: PriorityTableKey;
      taskKey: string;
    } & Partial<TaskItem>
  ) => void;
  deleteTask: (data: {
    projectKey: string;
    priorityKey: PriorityTableKey;
    taskKey: string;
  }) => void;
  toggleTaskComplete: (data: {
    projectKey: string;
    priorityKey: PriorityTableKey;
    taskKey: string;
  }) => void;
}

export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      background: string;
      surface: string;
      accent: string;
      primary: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      error: string;
      onSurface: string;
      disabled: string;
      placeholder: string;
      backdrop: string;
    };
  }
}
