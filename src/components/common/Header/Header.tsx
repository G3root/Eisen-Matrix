import * as React from "react";
import styled, { css } from "@emotion/native";
import { Text, StyleSheet } from "react-native";
export interface IHeaderProps {}

const Root = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
});

const Title = styled.Text({
  fontWeight: "bold",
  fontSize: 25,
});

export function Header(props: IHeaderProps) {
  return (
    <Root>
      <Title>My Dashboard</Title>
      <Text>My Dashboard</Text>
    </Root>
  );
}
