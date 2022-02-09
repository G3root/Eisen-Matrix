import * as React from "react";
import { format } from "date-fns";
import styled from "@emotion/native";
import { HelperText, Paragraph } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export interface IDatePlaceHolderProps {
  label: string;
  value: Date;
}

const Container = styled.TouchableOpacity(({ theme }) => ({
  paddingVertical: 15,
  borderColor: theme.colors.placeholder,
  borderWidth: 1,
  borderRadius: 5,
}));

const Text = styled(Paragraph)(({ theme }) => ({
  color: theme.colors.placeholder,
  fontSize: 15,
  marginLeft: 10,
}));

export function DatePlaceHolder({
  label,
  value,
  ...rest
}: IDatePlaceHolderProps & React.ComponentProps<typeof TouchableOpacity>) {
  const formatted = format(new Date(value), "MM/dd/yyyy");
  return (
    <>
      {/*
 // @ts-ignore */}
      <HelperText type="info" visible>
        {label}
      </HelperText>
      <Container {...rest}>
        <Text>{formatted}</Text>
      </Container>
    </>
  );
}
