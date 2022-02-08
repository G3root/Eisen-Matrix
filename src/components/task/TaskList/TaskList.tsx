import * as React from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import { useStore } from "../../../store";
import shallow from "zustand/shallow";
import styled from "@emotion/native";
import { EmptyList } from "../../common";
import { FlatList, ListRenderItem } from "react-native";
import { TaskItem } from "../../../types";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import { useTheme } from "react-native-paper";
export interface ITaskListProps {
  projectKey: string;
  matrixKey: 1 | 2 | 3 | 4;
}

const Spacer = styled.View({
  marginBottom: 10,
});

const Container = styled.View({
  marginHorizontal: 20,
});

type TaskWithId = TaskItem & { id: string };

export function TaskList(props: ITaskListProps) {
  const { matrixKey, projectKey } = props;
  const { colors } = useTheme();
  const { data, keys } = useStore(
    (state) => ({
      data: state.data[projectKey].tasks[matrixKey],
      keys: Object.keys(state.data[projectKey].tasks[matrixKey]),
    }),
    shallow
  );

  const allTasks: TaskWithId[] = [];
  const todoTasks: TaskWithId[] = [];
  const doneTasks: TaskWithId[] = [];

  for (let index = 0; index < keys.length; index++) {
    const id = keys[index];
    const task = {
      id,
      ...data[id],
    };

    allTasks.push(task);

    if (task.isCompleted) {
      doneTasks.push(task);
    } else {
      todoTasks.push(task);
    }
  }

  const renderItem: ListRenderItem<TaskItem & { id: string }> = ({ item }) => (
    <TaskCard taskKey={item.id} projectKey={projectKey} matrixKey={matrixKey} />
  );

  return (
    <Tabs
      style={{ backgroundColor: colors.background, marginTop: 10 }}
      uppercase={false}
    >
      <TabScreen label="All" icon="view-list">
        <Container>
          <FlatList
            data={allTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Spacer}
            ListEmptyComponent={
              <EmptyList
                title="No tasks yet"
                tagLine="Be sure to add your first task!"
              />
            }
            contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
          />
        </Container>
      </TabScreen>
      <TabScreen label="Todo" icon="target">
        <Container>
          <FlatList
            data={todoTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Spacer}
            ListEmptyComponent={
              <EmptyList
                title="No tasks yet"
                tagLine="Be sure to add your first task!"
              />
            }
            contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
          />
        </Container>
      </TabScreen>
      <TabScreen label="Done" icon="check-all">
        <Container>
          <FlatList
            data={doneTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Spacer}
            ListEmptyComponent={
              <EmptyList
                title="No tasks yet"
                tagLine="Be sure to add your first task!"
              />
            }
            contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
          />
        </Container>
      </TabScreen>
    </Tabs>
  );
}
