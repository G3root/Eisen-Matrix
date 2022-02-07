import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  useTheme,
  Title,
  Caption,
  Colors,
  Chip,
} from "react-native-paper";
import { useStore } from "../../../store";
import { RootStackScreenProps } from "../../../types";
import shallow from "zustand/shallow";
import styled from "@emotion/native";
import { View } from "react-native";
import { isPast, formatDistanceToNow } from "date-fns";
import { Feather } from "@expo/vector-icons";
export interface IProjectCardProps {
  projectKey: string;
  navigation: RootStackScreenProps<"Home">["navigation"];
}

const CustomTitle = styled(Title)(({ checked }: { checked?: boolean }) => ({
  textDecorationLine: checked ? "line-through" : "none",
}));

const CustomSubtitle = styled(Caption)(
  ({ checked }: { checked?: boolean }) => ({
    textDecorationLine: checked ? "line-through" : "none",
  })
);

const CustomChip = styled(Chip)({
  marginRight: 10,
});

export function ProjectCard(props: IProjectCardProps) {
  const { projectKey, navigation } = props;
  const { colors } = useTheme();
  const {
    deleteProject,
    title,
    emoji,
    isCompleted,
    toggleComplete,
    dueDate,
    tasks,
  } = useStore(
    (state) => ({
      deleteProject: state.deleteProject,
      title: state.data[projectKey].title,
      emoji: state.data[projectKey].emoji,
      isCompleted: state.data[projectKey].isCompleted,
      toggleComplete: state.toggleCompleteProject,
      dueDate: state.data[projectKey].dueDate,
      tasks: state.data[projectKey].tasks,
    }),
    shallow
  );
  const FormattedDueDate = formatDistanceToNow(new Date(dueDate), {
    addSuffix: true,
  });

  const isToday = isPast(new Date(dueDate));

  let taskCount = 0;
  const taskKeys: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4];
  taskKeys.map(
    (key) => (taskCount = taskCount + Object.keys(tasks[key]).length)
  );

  const LeftContent = () => (
    <Avatar.Text
      color="white"
      style={{ backgroundColor: colors.background }}
      label={emoji}
      size={50}
      labelStyle={{ fontSize: 20 }}
    />
  );

  const RightContent = () => <CustomChip>{taskCount}</CustomChip>;

  return (
    <Card
      onPress={() =>
        navigation.push("projectDetail", { key: projectKey, title })
      }
      mode="outlined"
    >
      <Card.Title
        title={<CustomTitle checked={isCompleted}>{title}</CustomTitle>}
        subtitle={
          <CustomSubtitle checked={isCompleted}>
            <Feather name="clock" /> {isToday ? "Today" : FormattedDueDate}
          </CustomSubtitle>
        }
        left={LeftContent}
        right={RightContent}
        style={{ minHeight: 90 }}
      />
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.push("projectEditModal", { projectKey, title })
          }
        >
          Edit
        </Button>
        <Button onPress={() => deleteProject({ key: projectKey })}>
          Delete
        </Button>
        <View style={{ flex: 1 }} />
        <Button
          icon={!isCompleted ? "check" : "x-circle"}
          mode="outlined"
          color={!isCompleted ? Colors.green800 : Colors.red800}
          onPress={() => toggleComplete({ projectKey })}
        >
          {!isCompleted ? "Complete" : "Incomplete"}
        </Button>
      </Card.Actions>
    </Card>
  );
}
