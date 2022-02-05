import * as React from "react";
import { ScrollView } from "react-native";
import { Checkbox, Button } from "react-native-paper";
import { RootStackScreenProps } from "../../../types";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "@emotion/native";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  DatePlaceHolder,
  EmojiPlaceholder,
  Input,
} from "../../InputPrimitives";
import { useStore } from "../../../store";
import shallow from "zustand/shallow";
import { nanoid } from "../../../utils";
import EmojiPicker from "rn-emoji-keyboard";
export interface IProjectFormProps {
  projectKey?: string;
  navigation: RootStackScreenProps<
    "projectCreateModal" | "projectEditModal"
  >["navigation"];
}

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
  emoji: string;
};

export function ProjectForm({ projectKey, navigation }: IProjectFormProps) {
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
      emoji: "",
    },
  });

  const { createProject, updateProject } = useStore(
    (state) => ({
      createProject: state.createProject,
      updateProject: state.updateProject,
    }),
    shallow
  );
  const [open, setOpen] = React.useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (projectKey) {
      const previousdata = useStore.getState().data[projectKey];
      const values = {
        ...previousdata,
        ...data,
        key: projectKey,
      };
      updateProject(values);
    } else {
      const key = nanoid();
      const values = {
        key,
        tasks: { 1: {}, 2: {}, 3: {}, 4: {} },
        createdAt: new Date(),
        ...data,
      };
      createProject(values);
    }

    navigation.goBack();
  };

  const isCompleted = watch("isCompleted");
  const dueDate = watch("dueDate");
  const emoji = watch("emoji");

  React.useEffect(() => {
    register("isCompleted");
    register("dueDate");
    register("emoji");
  }, []);

  React.useEffect(() => {
    if (projectKey) {
      const data = useStore.getState().data[projectKey];
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("isCompleted", data.isCompleted);
      setValue("emoji", data.emoji);
      setValue("dueDate", new Date(data.dueDate));
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <Container>
        <EmojiPlaceholder onPress={() => setIsEmojiOpen(true)} label={emoji} />
        <EmojiPicker
          onEmojiSelected={(emojiData) => setValue("emoji", emojiData.emoji)}
          open={isEmojiOpen}
          onClose={() => setIsEmojiOpen(false)}
        />
        <Spacer mb={30} />
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
        <Button color="black" mode="contained" onPress={handleSubmit(onSubmit)}>
          Save project
        </Button>
      </Container>
    </ScrollView>
  );
}
