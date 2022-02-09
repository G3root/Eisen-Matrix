import * as React from "react";
import { Appbar, IconButton, Title } from "react-native-paper";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import styled from "@emotion/native";
import { useTheme } from "../../../store";
import shallow from "zustand/shallow";

const CustomTitle = styled(Title)<{ isHome: boolean }>(({ isHome, theme }) => ({
  fontSize: isHome ? 25 : 20,
  color: theme.colors.text,
}));

const IconContainer = styled.View({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
});

const Header = styled(Appbar.Header)(({ theme }) => ({
  backgroundColor: theme.colors.background,
}));

export function Navbar({
  navigation,
  back,
  options,
  route,
}: NativeStackHeaderProps) {
  const { toggleTheme, isDark } = useTheme(
    (state) => ({ toggleTheme: state.toggleTheme, isDark: state.isDark }),
    shallow
  );
  const isHome = route.name === "Home";

  return (
    <Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={<CustomTitle isHome={isHome}>{options.title} </CustomTitle>}
      />
      {!back ? (
        <IconContainer>
          <IconButton
            icon={isDark ? "sun" : "moon"}
            size={23}
            onPress={() => toggleTheme()}
          />
          <IconButton
            icon="info"
            size={23}
            onPress={() => navigation.navigate("aboutModal")}
          />
        </IconContainer>
      ) : null}
    </Header>
  );
}
