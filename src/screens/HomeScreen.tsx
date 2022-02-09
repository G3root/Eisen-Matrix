import { ProjectList } from "../components/project";
import { FabButton } from "../components/common";
import { RootStackScreenProps } from "../types";

export function HomeScreen({
  route,
  navigation,
}: RootStackScreenProps<"Home">) {
  return (
    <>
      <ProjectList />

      <FabButton
        icon="plus-square"
        label="add project"
        color="white"
        onPress={() => navigation.navigate("projectCreateModal")}
      />
    </>
  );
}
