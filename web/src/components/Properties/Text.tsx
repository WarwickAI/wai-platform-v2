import { Box, ChakraProps, Input, StyleProps, Text } from "@chakra-ui/react";

interface TextPropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
  isTitle?: boolean;
}

const TextProperty: React.FC<TextPropertyProps> = (props) => {
  if (!props.isEdit) {
    return (
      <Box m={2}>
        <Text
          mx={2}
          fontWeight={props.isTitle ? "bold" : "normal"}
          fontSize={props.isTitle ? "lg" : "md"}
        >
          {props.value}
        </Text>
      </Box>
    );
  } else {
    return (
      <Input
        value={props.value}
        type={"text"}
        onChange={async (e) => {
          props.onChange(e.target.value);
        }}
        size={props.isTitle ? "lg" : "md"}
        fontWeight={props.isTitle ? "bold" : "normal"}
      />
    );
  }
};

export default TextProperty;
