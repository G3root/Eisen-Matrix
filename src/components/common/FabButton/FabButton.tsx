import * as React from "react";
import styled from "@emotion/native";
import { FAB } from "react-native-paper";

type Fab = React.ComponentProps<typeof FAB>;

type FabButton = Omit<Fab, "theme">;

const Button = styled(FAB)({
  position: "absolute",
  bottom: 40,
  left: "30%",
});

export function FabButton({ ...rest }: FabButton) {
  return <Button {...rest} />;
}
