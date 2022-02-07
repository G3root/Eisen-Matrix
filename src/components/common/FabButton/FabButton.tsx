import * as React from "react";
import styled from "@emotion/native";
import { FAB } from "react-native-paper";

type Fab = React.ComponentProps<typeof FAB>;

const Button = styled(FAB)({
  position: "absolute",
  bottom: 40,
  left: "30%",
});

export function FabButton({ ...rest }: Fab) {
  return <Button {...rest} />;
}
