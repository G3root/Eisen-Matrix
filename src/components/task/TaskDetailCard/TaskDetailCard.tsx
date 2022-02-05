import styled from "@emotion/native";
import * as React from "react";
import { ScrollView } from "react-native";
import {
  Avatar,
  Card,
  Title,
  useTheme,
  Chip,
  Subheading,
  Caption,
} from "react-native-paper";
import { useStore } from "../../../store";
import shallow from "zustand/shallow";

export interface ITaskDetailCardProps {
  projectKey: string;
  matrixKey: 1 | 2 | 3 | 4;
  taskKey: string;
}

const EmojiWrapper = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 30,
});

const CategoryWrapper = styled.View({
  display: "flex",
  flexDirection: "row",
  marginBottom: 8,
});

const CustomParagraph = styled.Text({
  marginTop: 10,
});

const MatrixWrapper = styled.View({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginTop: 30,
  marginBottom: 15,
});

const MatrixRow = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export function TaskDetailCard({
  projectKey,
  matrixKey,
  taskKey,
}: ITaskDetailCardProps) {
  const { colors } = useTheme();
  const { title, category, description, importance, urgency, emoji } = useStore(
    (state) => state.data[projectKey].tasks[matrixKey][taskKey],
    shallow
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <Card>
        <Card.Content>
          <EmojiWrapper>
            <Avatar.Text
              color="white"
              style={{ backgroundColor: colors.background }}
              label={emoji}
              size={90}
              labelStyle={{ fontSize: 40 }}
            />
          </EmojiWrapper>
          <CategoryWrapper>
            <Chip icon="star">{category}</Chip>
          </CategoryWrapper>

          <Title>{title}</Title>
          <CustomParagraph>{description}</CustomParagraph>
          <MatrixWrapper>
            <MatrixRow>
              <Subheading>{urgency}/4</Subheading>
              <Caption>Urgency</Caption>
            </MatrixRow>
            <MatrixRow>
              <Subheading>{importance}/4</Subheading>
              <Caption>Importance</Caption>
            </MatrixRow>
          </MatrixWrapper>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
