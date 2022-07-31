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
        width="full"
        minWidth={0}
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
          width="full"
          minWidth={0}
          noOfLines={1}
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
