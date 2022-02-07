import styled from "@emotion/native";
import { ProjectList } from "../components/project";
import { FabButton } from "../components/common";

import { RootStackScreenProps } from "../types";
const Container = styled.View({
  marginHorizontal: 20,
});

export function HomeScreen({
  route,
  navigation,
}: RootStackScreenProps<"Home">) {
  return (
    <>
      <Container>
        <ProjectList navigation={navigation} />
      </Container>
      <FabButton
        icon="plus-square"
        label="add project"
        color="white"
        onPress={() => navigation.navigate("projectCreateModal")}
      />
    </>
  );
}
