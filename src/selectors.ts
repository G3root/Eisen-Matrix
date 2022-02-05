import { EinsenMatrixState, Theme } from "./types";

export const CreateProject = (state: EinsenMatrixState) => state.createProject;
export const Store = (state: EinsenMatrixState) => state.data;
export const DeleteProject = (state: EinsenMatrixState) => state.deleteProject;
export const AddTask = (state: EinsenMatrixState) => state.addTask;
export const ToggleComplete = (state: EinsenMatrixState) =>
  state.toggleComplete;
export const DeleteTask = (state: EinsenMatrixState) => state.deleteTask;
export const IsDark = (state: Theme) => state.isDark;
export const ToggleTheme = (state: Theme) => state.toggleTheme;
