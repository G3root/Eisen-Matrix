import * as React from "react";
import { RootStackScreenProps } from "../types";
import { TaskForm } from "../components/form";

export function TaskCreateModal({
  route,
  navigation,
}: RootStackScreenProps<"taskCreateModal">) {
  const { key } = route.params;
  return <TaskForm projectKey={key} />;
}
