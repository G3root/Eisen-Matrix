import * as React from "react";
import { Avatar, Card, Title, Caption, useTheme } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View } from "react-native";
import styled from "@emotion/native";
import { useStore } from "../../../store";
import shallow from "zustand/shallow";
import { ToggleComplete } from "../../../selectors";
import { RootStackScreenProps } from "../../../types";

export interface ITaskCardProps {
  projectKey: string;
  matrixKey: 1 | 2 | 3 | 4;
  taskKey: string;
  navigation: RootStackScreenProps<"taskList">["navigation"];
}

const CustomTitle = styled(Title)(({ checked }: { checked?: boolean }) => ({
  textDecorationLine: checked ? "line-through" : "none",
}));
const CustomSubtitle = styled(Caption)(
  ({ checked }: { checked?: boolean }) => ({
    textDecorationLine: checked ? "line-through" : "none",
  })
);

export function TaskCard({
  projectKey,
  matrixKey,
  taskKey,
  navigation,
}: ITaskCardProps) {
  const { colors } = useTheme();

  const { title, category, isCompleted, emoji } = useStore(
    (state) => ({
      title: state.data[projectKey].tasks[matrixKey][taskKey].title,
      category: state.data[projectKey].tasks[matrixKey][taskKey].category,
      isCompleted: state.data[projectKey].tasks[matrixKey][taskKey].isCompleted,
      emoji: state.data[projectKey].tasks[matrixKey][taskKey].emoji,
    }),
    shallow
  );

  const toggleComplete = useStore(ToggleComplete);
  const LeftContent = () => (
    <Avatar.Text
      color="white"
      style={{ backgroundColor: colors.background }}
      label={emoji}
      size={50}
      labelStyle={{ fontSize: 20 }}
    />
  );
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <BouncyCheckbox
        disableBuiltInState
        isChecked={isCompleted}
        size={25}
        fillColor={colors.onSurface}
        unfillColor="#FFFFFF"
        iconStyle={{ borderRadius: 10 }}
        iconImageStyle={{ width: 13, height: 13 }}
        onPress={() =>
          toggleComplete({ priorityKey: matrixKey, taskKey, projectKey })
        }
        style={{ marginLeft: 5 }}
      />
      <View style={{ flex: 1 }}>
        <Card
          mode="elevated"
          onPress={() =>
            navigation.push("taskDetail", {
              title,
              projectKey,
              taskKey,
              matrixKey,
            })
          }
        >
          <Card.Title
            title={<CustomTitle checked={isCompleted}>{title}</CustomTitle>}
            subtitle={
              <CustomSubtitle checked={isCompleted}>{category}</CustomSubtitle>
            }
            left={LeftContent}
            style={{ minHeight: 90 }}
          />
        </Card>
      </View>
    </View>
  );
}
