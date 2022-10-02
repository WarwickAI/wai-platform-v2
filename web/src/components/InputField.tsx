import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Heading,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Tooltip,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import ReactMarkdown from "react-markdown";
import infoOutline from "@iconify/icons-eva/info-outline";
import { getIcon } from "./SidebarConfig";
import remarkGfm from "remark-gfm";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { markdownTheme } from "../theme";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  renderMarkdown?: boolean;
  type?: "text" | "textarea" | "switch" | "number";
  hint?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  color: _1,
  type = "text",
  hint,
  renderMarkdown = false,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <Flex>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        {hint && <Tooltip label={hint}>{getIcon(infoOutline)}</Tooltip>}
      </Flex>

      {type === "text" && (
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        ></Input>
      )}

      {type === "textarea" && (
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
          />
          <Heading size="sm" mb={2}>
            {label} Rendered
          </Heading>
          {renderMarkdown && (
            <ReactMarkdown
              components={ChakraUIRenderer(markdownTheme)}
              linkTarget="_self"
              remarkPlugins={[remarkGfm]}
            >
              {field.value}
            </ReactMarkdown>
          )}
        </>
      )}

      {type === "switch" && (
        <>
          {/* 
        // @ts-ignore */}
          <Switch
            {...field}
            {...props}
            isChecked={field.value}
            id={field.name}
          />
        </>
      )}

      {type === "number" && (
        <NumberInput>
          <NumberInputField
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
