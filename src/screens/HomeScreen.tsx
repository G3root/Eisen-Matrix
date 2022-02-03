import styled, { css } from "@emotion/native";
import { Header } from "../components/home";
import { ProjectFabButton } from "../components/home";
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
      </Container>
      <ProjectFabButton />
    </>
  );
}
