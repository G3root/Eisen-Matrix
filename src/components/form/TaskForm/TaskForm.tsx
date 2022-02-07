import * as React from "react";
import { ScrollView } from "react-native";
import { Paragraph, Button, useTheme } from "react-native-paper";
import { RootStackScreenProps } from "../../../types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Slider } from "@miblanchard/react-native-slider";
import styled from "@emotion/native";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  DatePlaceHolder,
  Input,
  EmojiPlaceholder,
} from "../../../components/InputPrimitives";
import { useStore } from "../../../store";
import shallow from "zustand/shallow";
import { nanoid } from "../../../utils";
import EmojiPicker from "rn-emoji-keyboard";
export interface ITaskFormProps {
  projectKey: string;
  priorityKey?: 1 | 2 | 3 | 4;
  taskKey?: string;
}

const Container = styled.View({
  display: "flex",
  marginHorizontal: 20,
  marginTop: 60,
});

const Spacer = styled.View((props: { mb?: number }) => ({
  marginBottom: props.mb ? props.mb : 10,
}));

const RenderTrackMarkComponent = styled.View(({ bg }: { bg: string }) => ({
  borderColor: bg,
  left: -3 / 2,
  borderRadius: 9999,
  borderWidth: 3,
}));

type Inputs = {
  title: string;
  emoji: string;
  description: string;
  category: string;
  urgency: number;
  importance: number;
  dueDate: Date;
};

export function TaskForm({ projectKey, priorityKey, taskKey }: ITaskFormProps) {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
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
      emoji: "",
    },
  });

  const { addTask, updateTask } = useStore(
    (state) => ({
      addTask: state.addTask,
      updateTask: state.updateTask,
    }),
    shallow
  );

  const [open, setOpen] = React.useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (priorityKey && taskKey) {
      const previousdata =
        useStore.getState().data[projectKey].tasks[priorityKey][taskKey];
      const values = {
        ...previousdata,
        ...data,
        projectKey,
        priorityKey,
        taskKey,
      };
      updateTask(values);
    } else {
      const total = data.importance + data.urgency;
      const avg = Math.round(total / 2);
      const finalAvg = avg === 0 ? 1 : avg;
      const values = {
        projectKey,
        priorityKey: finalAvg as any,
        taskKey: nanoid(),
        createdAt: new Date(),
        isCompleted: false,
        ...data,
      };
      addTask(values);
    }
    navigation.goBack();
  };

  const dueDate = watch("dueDate");
  const urgency = watch("urgency");
  const importance = watch("importance");
  const emoji = watch("emoji");

  React.useEffect(() => {
    register("dueDate");
    register("urgency");
    register("importance");
    register("emoji");
  }, [register]);

  React.useEffect(() => {
    if (priorityKey && taskKey) {
      const data =
        useStore.getState().data[projectKey].tasks[priorityKey][taskKey];
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("category", data.category);
      setValue("urgency", data.urgency);
      setValue("importance", data.importance);
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

        <Spacer />
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
            return (
              <RenderTrackMarkComponent
                bg={dark ? colors.background : colors.text}
              />
            );
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
            return (
              <RenderTrackMarkComponent
                bg={dark ? colors.background : colors.text}
              />
            );
          }}
          value={urgency}
          trackMarks={[0, 1, 2, 3, 4]}
        />

        <Spacer mb={20} />
        <Button
          color={colors.text}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Save task
        </Button>
      </Container>
    </ScrollView>
  );
}
