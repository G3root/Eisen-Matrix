import * as React from "react";

import { Dimensions } from "react-native";
import styled from "@emotion/native";
import { Title, Caption } from "react-native-paper";
import LottieView from "lottie-react-native";

const Container = styled.View(({ height }: { height: number }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height,
}));

export interface IEmptyListProps {
  title: string;
  tagLine: string;
}

export function EmptyList({ title, tagLine }: IEmptyListProps) {
  const windowHeight = Dimensions.get("window").height;
  const ContainerHeight = windowHeight * 0.6;
  const height = windowHeight * 0.3;
  return (
    <Container height={ContainerHeight}>
      <LottieView
        source={require("../../../../assets/lottie/empty-state.json")}
        autoPlay
        loop
        style={{ height }}
      />
      <Title>{title}</Title>
      <Caption>{tagLine}</Caption>
    </Container>
  );
}
