import { Project } from "../../types";
import { render, fireEvent } from "@testing-library/react-native";
import shallow from "zustand/shallow";
import { View, Text, Button } from "react-native";
import { useStore } from "..";
import { defaultProject, project1, project2 } from "./constants";

jest.setTimeout(10000);

function ProjectComponent() {
  const {
    createProject,
    projects,
    updateProject,
    deleteProject,
    toggleCompleteProject,
  } = useStore(
    (state) => ({
      createProject: state.createProject,
      projects: state.data,
      updateProject: state.updateProject,
      deleteProject: state.deleteProject,
      toggleCompleteProject: state.toggleCompleteProject,
    }),
    shallow
  );

  const createData = (data: Project & { key: string }) => {
    createProject(data);
  };

  const getData = (projectKey: string) => {
    const { title, description, isCompleted } = projects[projectKey];
    return { title, description, isCompleted };
  };

  const updateData = (data: Partial<Project> & { key: string }) => {
    updateProject(data);
  };

  const deleteData = (key: string) => {
    deleteProject({ key });
  };

  const completeData = (projectKey: string) => {
    toggleCompleteProject({ projectKey });
  };

  return (
    <View>
      <Text>project count: {Object.keys(projects).length}</Text>
      {/*
 // @ts-ignore */}
      <Button title="create project" onPress={createData} />
      {/*
 // @ts-ignore */}
      <Button title="get project" onPress={getData} />
      {/*
 // @ts-ignore */}
      <Button title="update project" onPress={updateData} />
      {/*
 // @ts-ignore */}
      <Button title="delete project" onPress={deleteData} />
      {/*
 // @ts-ignore */}
      <Button title="complete project" onPress={completeData} />
    </View>
  );
}

it("should create a project", async () => {
  const { getByText } = render(<ProjectComponent />);
  await new Promise((r) => setTimeout(r, 10));
  // thttps://github.com/pmndrs/zustand/issues/272

  getByText("project count: 0");

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
    key: project1.projectKey,
  });

  getByText("project count: 1");

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project2.title,
    description: project2.description,
    key: project2.projectKey,
  });

  getByText("project count: 2");

  const project1Data = fireEvent.press(
    getByText("get project"),
    project1.projectKey
  );

  expect(project1Data).toMatchObject({
    title: project1.title,
    description: project1.description,
    isCompleted: project1.isCompleted,
  });

  const project2Data = fireEvent.press(
    getByText("get project"),
    project2.projectKey
  );

  expect(project2Data).toMatchObject({
    title: project2.title,
    description: project2.description,
    isCompleted: project1.isCompleted,
  });
});

it("should update a project", async () => {
  const { getByText } = render(<ProjectComponent />);

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
    key: project1.projectKey,
  });

  const newData = {
    title: "test 1",
    description: "test 2",
  };

  const project1Data = fireEvent.press(
    getByText("get project"),
    project1.projectKey
  );

  fireEvent.press(getByText("update project"), {
    key: project1.projectKey,
    ...newData,
  });

  const project1UpdatedData = fireEvent.press(
    getByText("get project"),
    project1.projectKey
  );

  expect(project1UpdatedData).not.toMatchObject(project1Data);

  expect(project1UpdatedData).toMatchObject(newData);
});

it("should delete a project", async () => {
  const { getByText } = render(<ProjectComponent />);

  getByText("project count: 0");

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
    key: project1.projectKey,
  });

  getByText("project count: 1");

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project2.title,
    description: project2.description,
    key: project2.projectKey,
  });

  getByText("project count: 2");

  fireEvent.press(getByText("delete project"), project1.projectKey);

  getByText("project count: 1");

  fireEvent.press(getByText("delete project"), project2.projectKey);

  getByText("project count: 0");
});

it("should toggle project complete status", async () => {
  const { getByText } = render(<ProjectComponent />);

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
    key: project1.projectKey,
  });

  expect(
    fireEvent.press(getByText("get project"), project1.projectKey).isCompleted
  ).toBeFalsy();

  fireEvent.press(getByText("complete project"), project1.projectKey);

  expect(
    fireEvent.press(getByText("get project"), project1.projectKey).isCompleted
  ).toBeTruthy();
});
