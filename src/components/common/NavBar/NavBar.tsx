import * as React from "react";
import {
  Appbar,
  useTheme as useThemeColor,
  IconButton,
  Title,
} from "react-native-paper";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import styled from "@emotion/native";
import { useTheme } from "../../../store";
import shallow from "zustand/shallow";

const CustomTitle = styled(Title)(
  ({ isHome, bg }: { isHome: boolean; bg: string }) => ({
    fontSize: isHome ? 25 : 20,
    color: bg,
  })
);

const IconContainer = styled.View({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
});

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
  const { colors } = useThemeColor();
  const isHome = route.name === "Home";

  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={
          <CustomTitle bg={colors.text} isHome={isHome}>
            {options.title}{" "}
          </CustomTitle>
        }
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
    </Appbar.Header>
  );
}
