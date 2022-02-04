import styled from "@emotion/native";
import { FabButton } from "../components/home";

import { RootStackScreenProps } from "../types";
const Container = styled.View({
  marginHorizontal: 20,
  marginTop: 60,
});

export function ProjectDetailScreen({
  route,
  navigation,
}: RootStackScreenProps<"projectDetail">) {
  return (
    <>
      <Container></Container>
      <FabButton icon="plus-square" label="add Task" color="white" />
    </>
  );
}
