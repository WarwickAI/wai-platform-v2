import { FormControl, FormLabel, Input, Typography } from "@mui/material";
import { useField } from "formik";
import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  color: _1,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl error={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      ></Input>
      {error ? <Typography>{error}</Typography> : null}
    </FormControl>
  );
};
