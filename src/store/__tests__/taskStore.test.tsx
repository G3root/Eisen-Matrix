import { Project, TaskItem, PriorityTableKey } from "../../types";
import { render, fireEvent } from "@testing-library/react-native";
import shallow from "zustand/shallow";
import { View, Button } from "react-native";
import { useStore } from "..";
import { defaultProject, project1, defaultTask, task1 } from "./constants";

function getRandom() {
  return Math.floor(Math.random() * 5);
}

jest.setTimeout(10000);

function TaskComponent({ projectKey }: { projectKey: string }) {
  const {
    createProject,
    updateTask,
    deleteTask,
    toggleCompleteTask,
    state,
    addTask,
  } = useStore(
    (state) => ({
      createProject: state.createProject,
      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
      toggleCompleteTask: state.toggleTaskComplete,
      state: state.data,
    }),
    shallow
  );

  const createProjectHandler = (data: Project & { key: string }) => {
    createProject({ ...data, key: projectKey });
  };

  const addTaskHandler = (
    data: {
      priorityKey: PriorityTableKey;
      taskKey: string;
    } & TaskItem
  ) => {
    addTask({ ...data, projectKey });
  };

  const getTaskHandler = ({
    priorityKey,
    taskKey,
  }: {
    priorityKey: PriorityTableKey;
    taskKey: string;
  }) => {
    const { title, description, isCompleted } =
      state[projectKey].tasks[priorityKey][taskKey];
    return { title, description, isCompleted };
  };

  const updateTaskHandler = (
    data: Partial<TaskItem> & {
      priorityKey: PriorityTableKey;
      taskKey: string;
    }
  ) => {
    updateTask({ ...data, projectKey });
  };
  const deleteTaskHandler = (data: {
    priorityKey: PriorityTableKey;
    taskKey: string;
  }) => {
    deleteTask({ ...data, projectKey });
  };

  const completeTaskHandler = (data: {
    priorityKey: PriorityTableKey;
    taskKey: string;
  }) => {
    toggleCompleteTask({ ...data, projectKey });
  };
  const getTaskCountHandler = (key: PriorityTableKey) =>
    Object.keys(state[projectKey].tasks[key]).length;

  //   * task priority Table
  //   * Urgent -> 4
  //   * Important -> 3
  //   * Delegate -> 2
  //   * Dump -> 1

  return (
    <View>
      {/*
 // @ts-ignore */}
      <Button title="get task count" onPress={getTaskCountHandler} />
      {/*
 // @ts-ignore */}
      <Button title="create project" onPress={createProjectHandler} />
      {/*
 // @ts-ignore */}
      <Button title="add task" onPress={addTaskHandler} />
      {/*
 // @ts-ignore */}
      <Button title="get task" onPress={getTaskHandler} />
      {/*
 // @ts-ignore */}
      <Button title="update task" onPress={updateTaskHandler} />
      {/*
 // @ts-ignore */}
      <Button title="delete task" onPress={deleteTaskHandler} />
      {/*
 // @ts-ignore */}
      <Button title="complete task" onPress={completeTaskHandler} />
    </View>
  );
}

it("should delete a task", async () => {
  const { getByText } = render(
    <TaskComponent projectKey={project1.projectKey} />
  );
  await new Promise((r) => setTimeout(r, 10));
  // thttps://github.com/pmndrs/zustand/issues/272

  const urgency = getRandom();
  const importance = getRandom();
  const avg = Math.round((urgency + importance) / 2);
  const priorityKey = avg === 0 ? 1 : avg;
  const taskKey = task1.taskKey;

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
  });

  expect(fireEvent.press(getByText("get task count"), priorityKey)).toBe(0);

  fireEvent.press(getByText("add task"), {
    ...defaultTask,
    ...task1,
    urgency,
    importance,
    priorityKey,
  });

  expect(fireEvent.press(getByText("get task count"), priorityKey)).toBe(1);

  fireEvent.press(getByText("delete task"), {
    priorityKey,
    taskKey,
  });

  expect(fireEvent.press(getByText("get task count"), priorityKey)).toBe(0);
});

it("should create a task", async () => {
  const { getByText } = render(
    <TaskComponent projectKey={project1.projectKey} />
  );

  const urgency = getRandom();
  const importance = getRandom();
  const avg = Math.round((urgency + importance) / 2);
  const priorityKey = avg === 0 ? 1 : avg;
  const taskKey = task1.taskKey;

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
  });

  expect(fireEvent.press(getByText("get task count"), priorityKey)).toBe(0);

  fireEvent.press(getByText("add task"), {
    ...defaultTask,
    ...task1,
    urgency,
    importance,
    priorityKey,
  });

  expect(fireEvent.press(getByText("get task count"), priorityKey)).toBe(1);

  const task1Data = fireEvent.press(getByText("get task"), {
    priorityKey,
    taskKey,
  });

  expect(task1Data).toMatchObject({
    title: task1.title,
    description: task1.description,
    isCompleted: task1.isCompleted,
  });
});

it("should update a task", async () => {
  const { getByText } = render(
    <TaskComponent projectKey={project1.projectKey} />
  );
  const newData = {
    title: "test 1",
    description: "test 2",
    isCompleted: true,
  };
  const urgency = getRandom();
  const importance = getRandom();
  const avg = Math.round((urgency + importance) / 2);
  const priorityKey = avg === 0 ? 1 : avg;
  const taskKey = task1.taskKey;

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
  });

  fireEvent.press(getByText("add task"), {
    ...defaultTask,
    ...task1,
    urgency,
    importance,
    priorityKey,
  });

  const task1Data = fireEvent.press(getByText("get task"), {
    priorityKey,
    taskKey,
  });

  expect(task1Data).toMatchObject({
    title: task1.title,
    description: task1.description,
    isCompleted: task1.isCompleted,
  });

  fireEvent.press(getByText("update task"), {
    ...newData,
    taskKey,
    priorityKey,
  });

  const task1UpdatedData = fireEvent.press(getByText("get task"), {
    priorityKey,
    taskKey,
  });

  expect(task1UpdatedData).toMatchObject(newData);
});

it("should toggle task complete status", async () => {
  const { getByText } = render(
    <TaskComponent projectKey={project1.projectKey} />
  );

  const urgency = getRandom();
  const importance = getRandom();
  const avg = Math.round((urgency + importance) / 2);
  const priorityKey = avg === 0 ? 1 : avg;
  const taskKey = task1.taskKey;

  fireEvent.press(getByText("create project"), {
    ...defaultProject,
    title: project1.title,
    description: project1.description,
  });

  fireEvent.press(getByText("add task"), {
    ...defaultTask,
    ...task1,
    urgency,
    importance,
    priorityKey,
  });

  expect(
    fireEvent.press(getByText("get task"), {
      priorityKey,
      taskKey,
    }).isCompleted
  ).toBeFalsy();

  fireEvent.press(getByText("complete task"), {
    priorityKey,
    taskKey,
  });

  expect(
    fireEvent.press(getByText("get task"), {
      priorityKey,
      taskKey,
    }).isCompleted
  ).toBeTruthy();
});
