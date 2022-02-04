import styled, { css } from "@emotion/native";
import { Header } from "../components/home";
import { ProjectFabButton } from "../components/home";
import { useStore } from "../store";
import { store as Store } from "../selectors";
import { RootStackScreenProps } from "../types";
const Container = styled.View({
  marginHorizontal: 20,
  marginTop: 60,
});

export function HomeScreen({
  route,
  navigation,
}: RootStackScreenProps<"Home">) {
  const store = useStore(Store);
  console.log(store);

  return (
    <>
      <Container>
        <Header navigation={navigation} />
      </Container>
      <ProjectFabButton navigation={navigation} />
    </>
  );
}
