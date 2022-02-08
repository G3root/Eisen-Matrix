import { Project, TaskItem } from "../../types";

export const defaultProject: Project = {
  title: "",
  description: "",
  createdAt: new Date(),
  dueDate: new Date(),
  emoji: "",
  isCompleted: false,
  tasks: {
    1: {},
    2: {},
    3: {},
    4: {},
  },
};

export const defaultTask: TaskItem = {
  title: "",
  emoji: "",
  description: "",
  createdAt: new Date(),
  dueDate: new Date(),
  category: "",
  importance: 0,
  urgency: 0,
  isCompleted: false,
};

export const project1 = {
  title: "test project 1",
  description: "test project 1 description",
  isCompleted: false,
  projectKey: "projectkeyOne",
};
export const project2 = {
  title: "test project 2",
  description: "test project 2 description",
  isCompleted: false,
  projectKey: "projectkeyTwo",
};

export const task1 = {
  title: "test task 1",
  description: "test task 1 description",
  isCompleted: false,
  urgency: 0,
  importance: 0,
  taskKey: "taskkeyOne",
};

export const task2 = {
  title: "test task 2",
  description: "test task 2 description",
  isCompleted: false,
  urgency: 0,
  importance: 0,
  taskKey: "taskkeyTwo",
};
