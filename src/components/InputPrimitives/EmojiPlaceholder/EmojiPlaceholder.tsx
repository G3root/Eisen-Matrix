import * as React from "react";
import styled from "@emotion/native";
import { useTheme, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export interface IEmojiPlaceholderProps {
  label: string;
}

const Container = styled(TouchableOpacity)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export function EmojiPlaceholder({
  label,
  ...rest
}: IEmojiPlaceholderProps & React.ComponentProps<typeof TouchableOpacity>) {
  const { colors } = useTheme();
  return (
    <Container {...rest}>
      <Avatar.Text
        style={{ backgroundColor: colors.disabled }}
        size={90}
        label={label}
      />
    </Container>
  );
}
