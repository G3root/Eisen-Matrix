import * as React from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import { useStore } from "../../../store";
import shallow from "zustand/shallow";
import styled from "@emotion/native";
import { EmptyList } from "../../common";
import { FlatList, ListRenderItem } from "react-native";
import { TaskItem } from "../../../types";
import { RootStackScreenProps } from "../../../types";
export interface ITaskListProps {
  projectKey: string;
  matrixKey: 1 | 2 | 3 | 4;
  navigation: RootStackScreenProps<"taskList">["navigation"];
}

const Spacer = styled.View({
  marginBottom: 10,
});

export function TaskList(props: ITaskListProps) {
  const { matrixKey, projectKey, navigation } = props;
  const data = useStore(
    (state) => state.data[projectKey].tasks[matrixKey],
    shallow
  );
  const keys = useStore(
    (state) => Object.keys(state.data[projectKey].tasks[matrixKey]),
    shallow
  );
  const refinedData = keys.map((key) => ({
    id: key,
    ...data[key],
  }));

  const renderItem: ListRenderItem<TaskItem & { id: string }> = ({ item }) => (
    <TaskCard
      navigation={navigation}
      taskKey={item.id}
      projectKey={projectKey}
      matrixKey={matrixKey}
    />
  );

  return (
    <FlatList
      data={refinedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Spacer}
      ListEmptyComponent={
        <EmptyList
          title="No tasks yet"
          tagLine="Be sure to add your first task!"
        />
      }
    />
  );
}
