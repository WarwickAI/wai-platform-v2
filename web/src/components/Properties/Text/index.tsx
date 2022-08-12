import {
  Box,
  ChakraProps,
  Flex,
  Input,
  StyleProps,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TextPropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
  isTitle?: boolean;
}

const TextProperty: React.FC<TextPropertyProps> = (props) => {
  const [value, setValue] = useState<string>(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  if (!props.isEdit) {
    return (
      <Flex
        height={props.isTitle ? 14 : 10}
        paddingInlineStart={4}
        paddingInlineEnd={4}
        alignItems="center"
        borderWidth={1}
        borderRadius="md"
        borderColor="white"
      >
        <Text
          fontWeight={props.isTitle ? "bold" : "normal"}
          fontSize={props.isTitle ? "2xl" : "md"}
          noOfLines={1}
          wordBreak={'break-word'}
        >
          {value}
        </Text>
      </Flex>
    );
  } else {
    return (
      <Input
        value={value}
        type={"text"}
        onChange={async (e) => {
          setValue(e.target.value);
          props.onChange(e.target.value);
        }}
        height={props.isTitle ? 14 : 10}
        fontSize={props.isTitle ? "2xl" : "md"}
        fontWeight={props.isTitle ? "bold" : "normal"}
      />
    );
  }
};

export default TextProperty;
