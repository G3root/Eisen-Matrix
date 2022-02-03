import * as React from "react";
import styled from "@emotion/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../../types";
export interface IHeaderProps {
  navigation: RootStackScreenProps<"Home">["navigation"];
}

const Root = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
});

const Title = styled.Text({
  fontWeight: "800",
  fontSize: 25,
  fontFamily: "Inter-Black",
});

const Icon = styled(Feather)({
  paddingHorizontal: 13,
});

const IconContainer = styled.View({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
});

const IconButton = styled(TouchableOpacity)({});

export function Header({ navigation }: IHeaderProps) {
  return (
    <Root>
      <Title>My Dashboard</Title>
      <IconContainer>
        <IconButton>
          <Icon name="moon" size={20} />
        </IconButton>
        <IconButton onPress={() => navigation.navigate("aboutModal")}>
          <Icon name="info" size={20} />
        </IconButton>
      </IconContainer>
    </Root>
  );
}
