import {
  Box,
  ChakraProps,
  Flex,
  Input,
  StyleProps,
  Text,
} from "@chakra-ui/react";

interface TextPropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
  isTitle?: boolean;
}

const TextProperty: React.FC<TextPropertyProps> = (props) => {
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
        overflow={"hidden"}
      >
        <Text
          fontWeight={props.isTitle ? "bold" : "normal"}
          fontSize={props.isTitle ? "2xl" : "md"}
        >
          {props.value}
        </Text>
      </Flex>
    );
  } else {
    return (
      <Input
        value={props.value}
        type={"text"}
        onChange={async (e) => {
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
