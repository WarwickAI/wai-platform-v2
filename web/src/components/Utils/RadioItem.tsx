import { Box, RadioProps, useRadio } from "@chakra-ui/react";

interface RadioItemProps extends RadioProps {
  inSettings?: boolean;
}

const RadioItem: React.FC<RadioItemProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w={props.inSettings ? "full" : "auto"}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={2}
        py={1}
        m={1}
        textAlign={props.inSettings ? "center" : "left"}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioItem;
