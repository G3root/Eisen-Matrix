import * as React from "react";
import { Card, Title, Paragraph, Colors } from "react-native-paper";
import styled from "@emotion/native";
import { View } from "react-native";

const Wrapper = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  minHeight: 100,
});

const CountText = styled.Text({
  fontSize: 50,
  fontWeight: "700",
  color: "white",
});

const CardWrapper = styled(Card)((props: { bg: string }) => ({
  borderRadius: 20,
  backgroundColor: props.bg,
}));

const TitleText = styled(Title)({
  color: "white",
});

const ParagraphText = styled(Paragraph)({
  color: "white",
});

export interface IMatrixCardProps {
  id: 1 | 2 | 3 | 4;
  count: number;
  onPress: () => void;
}

const data = {
  4: {
    title: "Do it now",
    description: "Urgent and Important",
    bg: Colors.green500,
  },
  3: {
    title: "Decide when to do",
    description: "Important Not Urgent",
    bg: Colors.blue500,
  },
  2: {
    title: "Delegate it",
    description: "Urgent Not Important",
    bg: Colors.red500,
  },
  1: {
    title: "Dump it!",
    description: "Not Important Not Urgent",
    bg: Colors.amber600,
  },
};

export function MatrixCard(props: IMatrixCardProps) {
  const { id, count, onPress } = props;

  return (
    <CardWrapper mode="outlined" bg={data[id].bg} onPress={onPress}>
      <Card.Content>
        <Wrapper>
          <View>
            <TitleText>{data[id].title}</TitleText>
            <ParagraphText>{data[id].description}</ParagraphText>
          </View>
          <View>
            <CountText>{count}</CountText>
          </View>
        </Wrapper>
      </Card.Content>
    </CardWrapper>
  );
}
