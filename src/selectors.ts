import { EinsenMatrixState } from "./types";

export const CreateProject = (state: EinsenMatrixState) => state.createProject;
export const Store = (state: EinsenMatrixState) => state.data;
export const DeleteProject = (state: EinsenMatrixState) => state.deleteProject;
export const AddTask = (state: EinsenMatrixState) => state.addTask;
