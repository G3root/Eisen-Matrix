import * as React from "react";
import { RootStackScreenProps } from "../types";
import { ProjectForm } from "../components/form";

export function ProjectEditModal({
  route,
  navigation,
}: RootStackScreenProps<"projectEditModal">) {
  return (
    <ProjectForm navigation={navigation} projectKey={route.params.projectKey} />
  );
}
