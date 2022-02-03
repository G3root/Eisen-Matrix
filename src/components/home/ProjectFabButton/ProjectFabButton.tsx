import * as React from "react";
import styled from "@emotion/native";
import { TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
type feather = React.ComponentProps<typeof Feather.Button>;

export interface IProjectFabButtonProps {
  children?: React.ReactNode;
}

const FabButton = styled(FAB)({
  position: "absolute",
  bottom: 40,
  left: "30%",
});

export function ProjectFabButton({
  children,
  ...rest
}: IProjectFabButtonProps) {
  return (
    <FabButton
      icon="plus-square"
      label="add project"
      color="white"
      onPress={() => console.log("Pressed")}
    />
  );
}
