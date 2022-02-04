import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { DeleteProject } from "../../../selectors";
import { useStore } from "../../../store";
export interface IProjectCardProps {
  title: string;
  objKey: string;
}
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export function ProjectCard(props: IProjectCardProps) {
  const { title, objKey } = props;
  const deleteProject = useStore(DeleteProject);

  const deleteHandler = (key: string) => deleteProject({ key });

  return (
    <Card>
      <Card.Title title={title} subtitle="Card Subtitle" left={LeftContent} />
      <Card.Actions>
        <Button>Edit</Button>
        <Button onPress={() => deleteHandler(objKey)}>Delete</Button>
      </Card.Actions>
    </Card>
  );
}
