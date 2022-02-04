import * as React from "react";
import { Card, Title, Paragraph, useTheme } from "react-native-paper";
import styled from "@emotion/native";
import { View } from "react-native";

const Wrapper = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  minHeight: 100,
});

const CountText = styled.Text((props: { bg: string }) => ({
  fontSize: 50,
  fontWeight: "700",
  color: props.bg,
}));

const CardWrapper = styled(Card)((props: { bg: string }) => ({
  borderRadius: 20,
  backgroundColor: props.bg,
}));

const TitleText = styled(Title)((props: { bg: string }) => ({
  color: props.bg,
}));

const ParagraphText = styled(Paragraph)((props: { bg: string }) => ({
  color: props.bg,
}));

export interface IMatrixCardProps {
  id: 1 | 2 | 3 | 4;
  count: number;
}

const data = {
  4: { title: "Do it now", description: "Urgent and Important", bg: "#30a46c" },
  3: {
    title: "Decide when to do",
    description: "Important Not Urgent",
    bg: "#0081f1",
  },
  2: {
    title: "Delegate it",
    description: "Urgent Not Important",
    bg: "#dc3d43",
  },
  1: {
    title: "Dump it!",
    description: "Not Important Not Urgent",
    bg: "#ffa01c",
  },
};

export function MatrixCard(props: IMatrixCardProps) {
  const { id, count } = props;
  const { colors } = useTheme();

  return (
    <CardWrapper elevation={4} bg={data[id].bg}>
      <Card.Content>
        <Wrapper>
          <View>
            <TitleText bg={colors.surface}>{data[id].title}</TitleText>
            <ParagraphText bg={colors.surface}>
              {data[id].description}
            </ParagraphText>
          </View>
          <View>
            <CountText bg={colors.background}>{count}</CountText>
          </View>
        </Wrapper>
      </Card.Content>
    </CardWrapper>
  );
}
