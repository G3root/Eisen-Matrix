import * as React from "react";
import { format } from "date-fns";
import styled from "@emotion/native";
import { HelperText, Paragraph, useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export interface IDatePlaceHolderProps {
  label: string;
  value: Date;
}

const Container = styled.TouchableOpacity((props: { bg: string }) => ({
  paddingVertical: 15,
  borderColor: props.bg,
  borderWidth: 1,
  borderRadius: 5,
}));

const Text = styled(Paragraph)((props: { bg: string }) => ({
  color: props.bg,
  fontSize: 15,
  marginLeft: 10,
}));

export function DatePlaceHolder({
  label,
  value,
  ...rest
}: IDatePlaceHolderProps & React.ComponentProps<typeof TouchableOpacity>) {
  const { colors } = useTheme();
  const formatted = format(new Date(value), "MM/dd/yyyy");
  return (
    <>
      {/*
 // @ts-ignore */}
      <HelperText type="info" visible>
        {label}
      </HelperText>
      <Container {...rest} bg={colors.placeholder}>
        <Text bg={colors.placeholder}>{formatted}</Text>
      </Container>
    </>
  );
}
