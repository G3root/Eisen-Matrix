import styled from "@emotion/native";
import { TaskDetailCard, TaskDetailFooter } from "../components/task";
import { RootStackScreenProps } from "../types";

const Container = styled.View({
  marginHorizontal: 20,
  marginTop: 20,
});

export function TaskDetailScreen({
  route,
  navigation,
}: RootStackScreenProps<"taskDetail">) {
  const { matrixKey, projectKey, taskKey } = route.params;
  return (
    <>
      <Container>
        <TaskDetailCard
          projectKey={projectKey}
          matrixKey={matrixKey}
          taskKey={taskKey}
        />
      </Container>
      <TaskDetailFooter
        projectKey={projectKey}
        matrixKey={matrixKey}
        taskKey={taskKey}
      />
    </>
  );
}
