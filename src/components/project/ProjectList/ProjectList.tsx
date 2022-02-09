import * as React from "react";
import { useStore } from "../../../store";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { FlatList, ListRenderItem } from "react-native";
import { Project } from "../../../types";
import shallow from "zustand/shallow";
import { Tabs, TabScreen } from "react-native-paper-tabs";

import styled from "@emotion/native";
import { EmptyList } from "../../common";

const Spacer = styled.View({
  marginBottom: 10,
});

const Container = styled.View({
  marginHorizontal: 20,
});

const Tab = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.colors.background,
  marginTop: 20,
}));

export interface IProjectListProps {}

type ProjectWithKey = Project & { projectKey: string };

export function ProjectList(props: IProjectListProps) {
  const { keys, store } = useStore(
    (state) => ({ keys: Object.keys(state.data), store: state.data }),
    shallow
  );

  const allProjects: ProjectWithKey[] = [];
  const todoProjects: ProjectWithKey[] = [];
  const doneProjects: ProjectWithKey[] = [];

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    const project = {
      projectKey: key,
      ...store[key],
    };

    allProjects.push(project);

    if (project.isCompleted) {
      doneProjects.push(project);
    } else {
      todoProjects.push(project);
    }
  }

  const renderItem: ListRenderItem<Project & { projectKey: string }> = ({
    item,
  }) => <ProjectCard projectKey={item.projectKey} />;

  return (
    <Tab uppercase={false}>
      <TabScreen label="All" icon="view-list">
        <Container>
          <FlatList
            data={allProjects}
            renderItem={renderItem}
            keyExtractor={(item) => item.projectKey}
            ItemSeparatorComponent={Spacer}
            ListEmptyComponent={
              <EmptyList
                title="No Projects Yet"
                tagLine="Be sure to add your first Project!"
              />
            }
            contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
          />
        </Container>
      </TabScreen>
      <TabScreen label="Todo" icon="target">
        <Container>
          <FlatList
            data={todoProjects}
            renderItem={renderItem}
            keyExtractor={(item) => item.projectKey}
            ItemSeparatorComponent={Spacer}
            ListEmptyComponent={
              <EmptyList
                title="No Projects Yet"
                tagLine="Be sure to add your first Project!"
              />
            }
            contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
          />
        </Container>
      </TabScreen>
      <TabScreen label="Done" icon="check-all">
        <Container>
          <FlatList
            data={doneProjects}
            renderItem={renderItem}
            keyExtractor={(item) => item.projectKey}
            ItemSeparatorComponent={Spacer}
            ListEmptyComponent={
              <EmptyList
                title="No Projects Yet"
                tagLine="Be sure to add your first Project!"
              />
            }
            contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
          />
        </Container>
      </TabScreen>
    </Tab>
  );
}
