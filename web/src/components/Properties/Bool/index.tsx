import { Checkbox, Flex, Text } from "@chakra-ui/react";

interface BoolPropertyProps {
  value: boolean;
  onChange: (v: boolean) => void;
  isEdit: boolean;
}

const BoolProperty: React.FC<BoolPropertyProps> = (props) => {
  if (!props.isEdit) {
    return (
      <Flex
        height={10}
        paddingInlineStart={4}
        paddingInlineEnd={4}
        alignItems="center"
        borderWidth={1}
        borderRadius="md"
        borderColor="white"
      >
        <Text
          fontWeight={"normal"}
          fontSize={"md"}
          noOfLines={1}
          wordBreak={"break-word"}
        >
          {props.value ? "Yes" : "No"}
        </Text>
      </Flex>
    );
  } else {
    return (
      <Checkbox
        isChecked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
      ></Checkbox>
    );
  }
};

export default BoolProperty;
