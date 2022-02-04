import * as React from "react";
import { useStore } from "../../../store";
import { Store } from "../../../selectors";
import { FlatList, ListRenderItem } from "react-native";
import styled from "@emotion/native";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { RootStackScreenProps } from "../../../types";
export interface IMatrixListProps {
  projectKey: string;
  navigation: RootStackScreenProps<"projectDetail">["navigation"];
}
const Spacer = styled.View({
  marginBottom: 20,
});

export function MatrixList(props: IMatrixListProps) {
  const { projectKey, navigation } = props;
  const store = useStore(Store);
  const tasks = store[projectKey].tasks;
  const keys: Array<1 | 2 | 3 | 4> = [4, 3, 2, 1];
  const refinedData = keys.map((key) => ({
    id: key,
    count: Object.keys(tasks[key]).length,
  }));

  const renderItem: ListRenderItem<{
    id: 1 | 2 | 3 | 4;
    count: number;
  }> = ({ item }) => (
    <MatrixCard
      onPress={() =>
        navigation.push("taskList", { projectKey, matrixKey: item.id })
      }
      id={item.id}
      count={item.count}
    />
  );

  return (
    <FlatList
      data={refinedData}
      renderItem={renderItem}
      keyExtractor={(item: { id: any }) => item.id}
      ItemSeparatorComponent={Spacer}
    />
  );
}
