import * as React from "react";
import { Button } from "react-native";
import { Checkbox, Paragraph, Subheading, Text } from "react-native-paper";
import { RootStackScreenProps } from "../types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Slider } from "@miblanchard/react-native-slider";
import styled from "@emotion/native";
import { useForm, SubmitHandler } from "react-hook-form";
import { DatePlaceHolder, Input } from "../components/InputPrimitives";
import { useStore } from "../store";

import { AddTask } from "../selectors";
import { nanoid } from "../utils";

const Container = styled.View({
  display: "flex",
  marginHorizontal: 20,
  marginTop: 60,
});

const Spacer = styled.View((props: { mb?: number }) => ({
  marginBottom: props.mb ? props.mb : 10,
}));

const RenderTrackMarkComponent = styled.View({
  borderColor: "black",
  left: -3 / 2,
  borderRadius: 9999,
  borderWidth: 3,
});

type Inputs = {
  title: string;
  description: string;
  category: string;
  urgency: number;
  importance: number;
  dueDate: Date;
};

export function TaskCreateModal({
  route,
  navigation,
}: RootStackScreenProps<"taskModal">) {
  const { key } = route.params;
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
      category: "",
      dueDate: new Date(),
      urgency: 0,
      importance: 0,
    },
  });

  const addTask = useStore(AddTask);

  const [open, setOpen] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const total = data.importance + data.urgency;
    const avg = Math.round(total / 2);
    const finalAvg = avg === 0 ? 1 : avg;
    const values = {
      projectKey: key,
      priorityKey: finalAvg as any,
      taskKey: nanoid(),
      createdAt: new Date(),
      isCompleted: false,
      ...data,
    };
    addTask(values);
    navigation.goBack();
  };

  const dueDate = watch("dueDate");
  const urgency = watch("urgency");
  const importance = watch("importance");
  React.useEffect(() => {
    register("dueDate");
    register("urgency");
    register("importance");
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
      <Input
        control={control}
        rules={{
          required: "this field is required",
        }}
        name="category"
        inputProps={{
          label: "category",
          mode: "outlined",
          autoComplete: false,
        }}
        errors={errors.category?.message}
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
      <Spacer mb={40} />
      <Paragraph>Importance</Paragraph>
      <Slider
        onValueChange={(value) => {
          if (Array.isArray(value)) {
            setValue("importance", value[0]);
          } else {
            setValue("importance", value);
          }
        }}
        maximumValue={4}
        minimumValue={0}
        step={1}
        value={importance}
        trackMarks={[0, 1, 2, 3, 4]}
        renderTrackMarkComponent={() => {
          return <RenderTrackMarkComponent />;
        }}
      />

      <Spacer mb={20} />
      <Paragraph>Urgency</Paragraph>
      <Slider
        onValueChange={(value) => {
          if (Array.isArray(value)) {
            setValue("urgency", value[0]);
          } else {
            setValue("urgency", value);
          }
        }}
        maximumValue={4}
        minimumValue={0}
        step={1}
        renderTrackMarkComponent={() => {
          return <RenderTrackMarkComponent />;
        }}
        value={urgency}
        trackMarks={[0, 1, 2, 3, 4]}
      />

      <Spacer mb={20} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
