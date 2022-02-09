import * as React from "react";
import { RootStackScreenProps } from "../types";
import { ProjectForm } from "../components/form";

export function ProjectCreateModal({
  route,
  navigation,
}: RootStackScreenProps<"projectCreateModal">) {
  return <ProjectForm />;
}
