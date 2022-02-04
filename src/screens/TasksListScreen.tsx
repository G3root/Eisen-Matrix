import styled from "@emotion/native";
import { RootStackScreenProps } from "../types";

const Container = styled.View({
  marginHorizontal: 20,
  marginTop: 60,
});

export function TaskListScreen({
  route,
  navigation,
}: RootStackScreenProps<"taskList">) {
  return (
    <>
      <Container></Container>
    </>
  );
}
