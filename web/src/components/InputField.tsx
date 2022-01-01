import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Heading,
  Switch,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import ReactMarkdown from "react-markdown";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  render?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  color: _1,
  textarea = false,
  render = false,
  ...props
}) => {
  const [field, { error }] = useField(props);
  // @ts-ignore
  return (
    <FormControl error={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {textarea ? (
        <>
          {/*
 // @ts-ignore */}
          <Textarea
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
            h={40}
            mb={4}
          ></Textarea>
          <Heading size="sm" mb={2}>
            {label} Rendered
          </Heading>
          <ReactMarkdown linkTarget="_self">{field.value}</ReactMarkdown>
        </>
      ) : props.type === "switch" ? (
        <>
          {/*
 // @ts-ignore */}
          <Switch
            {...field}
            {...props}
            isChecked={field.value}
            id={field.name}
          ></Switch>
        </>
      ) : (
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        ></Input>
      )}
      {error ? <div>{error}</div> : null}
    </FormControl>
  );
};
