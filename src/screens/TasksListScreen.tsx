import styled from "@emotion/native";
import { TaskList } from "../components/task/TaskList";
import { RootStackScreenProps } from "../types";
import { FabButton } from "../components/home";
const Container = styled.View({
  marginHorizontal: 20,
  marginTop: 60,
});

export function TaskListScreen({
  route,
  navigation,
}: RootStackScreenProps<"taskList">) {
  const { matrixKey, projectKey } = route.params;
  return (
    <>
      <Container>
        <TaskList
          navigation={navigation}
          projectKey={projectKey}
          matrixKey={matrixKey}
        />
      </Container>
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
