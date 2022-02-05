import * as React from "react";
import { Button } from "react-native";
import { Checkbox } from "react-native-paper";
import { RootStackScreenProps } from "../types";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "@emotion/native";
import { ProjectForm } from "../components/form";

export function ProjectCreateModal({
  route,
  navigation,
}: RootStackScreenProps<"projectCreateModal">) {
  return <ProjectForm navigation={navigation} />;
}
