import * as React from "react";
import { useStore } from "../../../store";
import { Store } from "../../../selectors";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { FlatList, ListRenderItem, View } from "react-native";
import { Project, RootStackScreenProps } from "../../../types";
import shallow from "zustand/shallow";

import styled from "@emotion/native";
import { EmptyList } from "../../common";
import { Button } from "react-native-paper";

const Spacer = styled.View({
  marginBottom: 10,
});

export interface IProjectListProps {
  navigation: RootStackScreenProps<"Home">["navigation"];
}

export function ProjectList({ navigation }: IProjectListProps) {
  const { keys, store } = useStore(
    (state) => ({ keys: Object.keys(state.data), store: state.data }),
    shallow
  );

  const refinedData = keys.map((key) => ({
    projectKey: key,
    ...store[key],
  }));

  const renderItem: ListRenderItem<Project & { projectKey: string }> = ({
    item,
  }) => <ProjectCard navigation={navigation} projectKey={item.projectKey} />;

  return (
    <FlatList
      data={refinedData}
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
  );
}
