import * as React from "react";
import { RootStackScreenProps } from "../types";
import { TaskForm } from "../components/form";

export function TaskEditModal({
  route,
  navigation,
}: RootStackScreenProps<"taskEditModal">) {
  const { matrixKey, projectKey, taskKey } = route.params;
  return (
    <TaskForm
      priorityKey={matrixKey}
      projectKey={projectKey}
      taskKey={taskKey}
    />
  );
}
