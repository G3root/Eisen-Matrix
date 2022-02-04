import * as React from "react";
import { useStore } from "../../../store";
import { Store } from "../../../selectors";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { FlatList, ListRenderItem } from "react-native";
import { Project } from "../../../types";
import shallow from "zustand/shallow";

import styled from "@emotion/native";
import { EmptyList } from "../../common";

const Spacer = styled.View({
  marginBottom: 10,
});

export interface IProjectListProps {}

export function ProjectList(props: IProjectListProps) {
  const store = useStore(Store);
  const keys = useStore((state) => Object.keys(state.data), shallow);
  const refinedData = keys.map((key) => ({
    id: key,
    ...store[key],
  }));

  const renderItem: ListRenderItem<Project & { id: string }> = ({ item }) => (
    <ProjectCard title={item.title} objKey={item.id} />
  );

  return (
    <>
      <FlatList
        data={refinedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Spacer}
        ListEmptyComponent={
          <EmptyList
            title="No Projects Yet"
            tagLine="Be sure to add your first Project!"
          />
        }
        contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
      />
    </>
  );
}
