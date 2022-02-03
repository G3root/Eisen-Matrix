import * as React from "react";
import { View, Text, Button } from "react-native";
import { RootStackScreenProps } from "../types";

export function AboutModalScreen({
  route,
  navigation,
}: RootStackScreenProps<"Home">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
