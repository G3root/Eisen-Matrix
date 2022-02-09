import * as React from "react";
import styled from "@emotion/native";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export interface IEmojiPlaceholderProps {
  label: string;
}

const Container = styled(TouchableOpacity)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AvatarText = styled(Avatar.Text)(({ theme }) => ({
  backgroundColor: theme.colors.disabled,
}));

export function EmojiPlaceholder({
  label,
  ...rest
}: IEmojiPlaceholderProps & React.ComponentProps<typeof TouchableOpacity>) {
  return (
    <Container {...rest}>
      <AvatarText size={90} label={label} />
    </Container>
  );
}
