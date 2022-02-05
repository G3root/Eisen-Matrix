import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Surface,
  IconButton,
  Colors,
} from "react-native-paper";
import styled from "@emotion/native";
import { Text, Dimensions, View, Share } from "react-native";
import { useStore } from "../../../store";
import shallow from "zustand/shallow";
import { ToggleComplete } from "../../../selectors";
import { RootStackScreenProps } from "../../../types";
import { format } from "date-fns";

const Container = styled(Surface)(({ width }: { width: number }) => ({
  position: "absolute",
  bottom: 0,
  width,
  paddingHorizontal: 10,
  paddingVertical: 15,
}));

const Wrapper = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
});

const Row = styled.View({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "row",
});

export interface ITaskDetailFooterProps {
  projectKey: string;
  matrixKey: 1 | 2 | 3 | 4;
  taskKey: string;
  navigation: RootStackScreenProps<"taskDetail">["navigation"];
}

const taskStatus = {
  1: "Dump",
  2: "Delegate",
  3: "Important",
  4: "Urgent",
};

export function TaskDetailFooter({
  projectKey,
  matrixKey,
  taskKey,
  navigation,
}: ITaskDetailFooterProps) {
  const width = Dimensions.get("screen").width;
  const {
    isCompleted,
    toggleComplete,
    deleteTask,
    title,
    description,
    category,
    createdAt,
  } = useStore(
    (state) => ({
      isCompleted: state.data[projectKey].tasks[matrixKey][taskKey].isCompleted,
      toggleComplete: state.toggleComplete,
      deleteTask: state.deleteTask,
      title: state.data[projectKey].tasks[matrixKey][taskKey].title,
      description: state.data[projectKey].tasks[matrixKey][taskKey].description,
      category: state.data[projectKey].tasks[matrixKey][taskKey].category,
      createdAt: state.data[projectKey].tasks[matrixKey][taskKey].createdAt,
    }),
    shallow
  );

  return (
    <Container width={width}>
      <Wrapper>
        <Row>
          <IconButton
            size={20}
            icon="edit-2"
            onPress={() => console.log("Pressed")}
            accessibilityLabel="Edit task"
          />

          <IconButton
            size={20}
            icon="trash-2"
            onPress={() => {
              deleteTask({ priorityKey: matrixKey, taskKey, projectKey });
              navigation.goBack();
            }}
            accessibilityLabel="Delete task"
          />

          <IconButton
            size={20}
            icon="share-2"
            onPress={async () => {
              try {
                const created = format(
                  new Date(createdAt),
                  "yyyy-MM-dd 'at' h:mm aaa"
                );
                const result = await Share.share({
                  message: `Title: ${title}\n\nDescription: ${description}\n\nCategory: ${category}\n\nPriority: ${taskStatus[matrixKey]}\n\ncreated at: ${created}`,
                });
              } catch (error) {
                console.log(error);
              }
            }}
            accessibilityLabel="Share task"
          />
        </Row>
        <View>
          <Button
            icon={!isCompleted ? "check" : "x-circle"}
            mode="contained"
            color={!isCompleted ? Colors.green800 : Colors.red800}
            onPress={() =>
              toggleComplete({ priorityKey: matrixKey, taskKey, projectKey })
            }
          >
            {!isCompleted ? "Complete" : "Incomplete"}
          </Button>
        </View>
      </Wrapper>
    </Container>
  );
}
