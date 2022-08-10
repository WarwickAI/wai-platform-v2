import { Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface NumberPropertyProps {
  value: number;
  onChange: (v: number) => void;
  isEdit: boolean;
  isTitle?: boolean;
}

const NumberProperty: React.FC<NumberPropertyProps> = (props) => {
  const [value, setValue] = useState<string>(props.value + "");

  useEffect(() => {
    setValue(props.value + "");
  }, [props.value]);

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
          {parseFloat(value)}
        </Text>
      </Flex>
    );
  } else {
    return (
      <Input
        value={value}
        type={"text"}
        onChange={async (e) => {
          // Check if last character is one of [. , 0]
          if (
            [".", ",", "0"].includes(
              e.target.value.charAt(e.target.value.length - 1)
            )
          ) {
            setValue(e.target.value);
          } else {
            // Remove commas
            e.target.value = e.target.value.replace(/,/g, "");
            setValue(parseFloat(e.target.value) + "");
            props.onChange(parseFloat(e.target.value));
          }
        }}
        height={props.isTitle ? 14 : 10}
        fontSize={props.isTitle ? "2xl" : "md"}
        fontWeight={props.isTitle ? "bold" : "normal"}
      />
    );
  }
};

export default NumberProperty;
