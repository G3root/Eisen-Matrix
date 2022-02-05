/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  HomeScreen,
  AboutModalScreen,
  ProjectCreateModal,
  ProjectDetailScreen,
  TaskCreateModal,
  TaskListScreen,
  TaskDetailScreen,
  ProjectEditModal,
  TaskEditModal,
} from "../screens";
import { RootStackParamList } from "../types";
import { NavigationContainer } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "../theme";

export default function Navigation({ isDark }: { isDark: boolean }) {
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="projectDetail"
          component={ProjectDetailScreen}
          options={({ route }) => ({ title: `${route.params.title} tasks` })}
        />
        <Stack.Screen
          name="taskDetail"
          component={TaskDetailScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="taskList"
          options={{ title: "All Tasks" }}
          component={TaskListScreen}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
        <Stack.Screen
          options={{ title: "About" }}
          name="aboutModal"
          component={AboutModalScreen}
        />
        <Stack.Screen
          options={{ title: "New Project" }}
          name="projectCreateModal"
          component={ProjectCreateModal}
        />
        <Stack.Screen
          options={({ route }) => ({ title: `Edit ${route.params.title}` })}
          name="projectEditModal"
          component={ProjectEditModal}
        />
        <Stack.Screen
          options={{ title: "New Task" }}
          name="taskCreateModal"
          component={TaskCreateModal}
        />
        <Stack.Screen
          options={({ route }) => ({ title: `Edit ${route.params.title}` })}
          name="taskEditModal"
          component={TaskEditModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
