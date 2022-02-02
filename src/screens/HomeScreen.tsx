import styled, { css } from "@emotion/native";
import { Header } from "../components/common";
const Container = styled.View({
  marginHorizontal: 20,
  marginTop: 20,
});

export function HomeScreen() {
  return (
    <Container>
      <Header />
    </Container>
  );
}
