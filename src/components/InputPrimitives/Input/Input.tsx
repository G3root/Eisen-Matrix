import * as React from "react";
import { HelperText, TextInput } from "react-native-paper";
import { Controller, UseControllerProps, Control, Path } from "react-hook-form";

type Form = Omit<UseControllerProps, "control" | "name">;

export interface IInputProps<Field> {
  inputProps: React.ComponentProps<typeof TextInput>;
  control: Control<Field>;
  name: Path<Field>;
  errors?: string;
}

export function Input<Field>({
  name,
  control,
  rules,
  inputProps,
  errors,
}: IInputProps<Field> & Form) {
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value as any}
            onBlur={onBlur}
            onChangeText={onChange}
            {...inputProps}
            error={errors ? true : false}
          />
        )}
      />
      {/*
 // @ts-ignore */}
      <HelperText type={"error"} visible={errors ? true : false}>
        {errors}
      </HelperText>
    </>
  );
}
