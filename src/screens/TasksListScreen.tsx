import styled from "@emotion/native";
import { TaskList } from "../components/task/TaskList";
import { RootStackScreenProps } from "../types";
import { FabButton } from "../components/common";

export function TaskListScreen({
  route,
  navigation,
}: RootStackScreenProps<"taskList">) {
  const { matrixKey, projectKey } = route.params;
  return (
    <>
      <TaskList projectKey={projectKey} matrixKey={matrixKey} />

      <FabButton
        icon="plus-square"
        label="add Task"
        color="white"
        onPress={() =>
          navigation.navigate("taskCreateModal", { key: projectKey })
        }
      />
    </>
  );
}
