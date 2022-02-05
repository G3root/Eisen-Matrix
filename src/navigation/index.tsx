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
} from "../screens";
import { RootStackParamList } from "../types";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

export default function Navigation() {
  return (
    <NavigationContainer>
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
          name="projectModal"
          component={ProjectCreateModal}
        />
        <Stack.Screen
          options={{ title: "New Task" }}
          name="taskModal"
          component={TaskCreateModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
