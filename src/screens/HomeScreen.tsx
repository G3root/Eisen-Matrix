import styled from "@emotion/native";
import { Header, ProjectList } from "../components/home";
import { FabButton } from "../components/home";

import { RootStackScreenProps } from "../types";
const Container = styled.View({
  marginHorizontal: 20,
  marginTop: 60,
});

export function HomeScreen({
  route,
  navigation,
}: RootStackScreenProps<"Home">) {
  return (
    <>
      <Container>
        <Header navigation={navigation} />
        <ProjectList />
      </Container>
      <FabButton
        icon="plus-square"
        label="add project"
        color="white"
        onPress={() => navigation.navigate("projectModal")}
      />
    </>
  );
}
