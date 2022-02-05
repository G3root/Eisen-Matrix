import * as React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { DeleteProject } from "../../../selectors";
import { useStore } from "../../../store";
import { RootStackScreenProps } from "../../../types";
export interface IProjectCardProps {
  title: string;
  objKey: string;
  navigation: RootStackScreenProps<"Home">["navigation"];
}
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export function ProjectCard(props: IProjectCardProps) {
  const { title, objKey, navigation } = props;
  const deleteProject = useStore(DeleteProject);

  const deleteHandler = (key: string) => deleteProject({ key });

  return (
    <Card
      onPress={() => navigation.push("projectDetail", { key: objKey, title })}
    >
      <Card.Title title={title} subtitle="Card Subtitle" left={LeftContent} />
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.push("projectEditModal", { projectKey: objKey, title })
          }
        >
          Edit
        </Button>
        <Button onPress={() => deleteHandler(objKey)}>Delete</Button>
      </Card.Actions>
    </Card>
  );
}
