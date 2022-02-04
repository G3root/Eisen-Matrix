import * as React from "react";
import { Button } from "react-native";
import { Checkbox } from "react-native-paper";
import { RootStackScreenProps } from "../types";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "@emotion/native";
import { useForm, SubmitHandler } from "react-hook-form";
import { DatePlaceHolder, Input } from "../components/InputPrimitives";
import { useStore } from "../store";

import { CreateProject } from "../selectors";
import { nanoid } from "../utils";

const Container = styled.View({
  display: "flex",
  marginHorizontal: 20,
  marginTop: 60,
});

const Spacer = styled.View((props: { mb?: number }) => ({
  marginBottom: props.mb ? props.mb : 10,
}));

type Inputs = {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
};

export function ProjectCreateModal({
  route,
  navigation,
}: RootStackScreenProps<"projectModal">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isCompleted: false,
      dueDate: new Date(),
    },
  });

  const createProject = useStore(CreateProject);

  const [open, setOpen] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const key = nanoid();
    const values = {
      key,
      tasks: { 1: {}, 2: {}, 3: {}, 4: {} },
      createdAt: new Date(),
      ...data,
    };
    createProject(values);
    navigation.goBack();
  };

  const isCompleted = watch("isCompleted");
  const dueDate = watch("dueDate");

  React.useEffect(() => {
    register("isCompleted");
    register("dueDate");
  }, [register]);

  return (
    <Container>
      <Input
        control={control}
        rules={{
          required: "this field is required",
        }}
        name="title"
        inputProps={{
          label: "Title",
          mode: "outlined",
          autoComplete: false,
        }}
        errors={errors.title?.message}
      />
      <Spacer />
      <Input
        control={control}
        rules={{
          required: "this field is required",
        }}
        name="description"
        inputProps={{
          label: "Description",
          mode: "outlined",
          autoComplete: false,
          numberOfLines: 5,
          multiline: true,
        }}
        errors={errors.description?.message}
      />

      <Spacer />
      <DatePlaceHolder
        label="Due Date"
        value={dueDate}
        onPress={() => setOpen(true)}
      />
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dueDate}
          mode="datetime"
          display="default"
          onChange={(e, d) => {
            const currentDate = d || dueDate;
            setOpen(false);
            setValue("dueDate", currentDate);
          }}
        />
      )}
      <Spacer mb={30} />
      <Checkbox.Item
        status={isCompleted ? "checked" : "unchecked"}
        label="Completed"
        onPress={() => {
          setValue("isCompleted", !isCompleted);
        }}
      />
      <Spacer mb={30} />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
