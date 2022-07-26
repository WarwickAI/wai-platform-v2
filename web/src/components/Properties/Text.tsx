import { ChakraProps, Input, StyleProps, Text } from "@chakra-ui/react";

interface TextPropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
  style?: ChakraProps;
  size?: string;
}

const TextProperty: React.FC<TextPropertyProps> = (props) => {
  if (!props.isEdit) {
    return <Text {...props.style}>{props.value}</Text>;
  } else {
    return (
      <Input
        value={props.value}
        type={"text"}
        onChange={async (e) => {
          props.onChange(e.target.value);
        }}
        size={props.size}
        {...props.style}
      />
    );
  }
};

export default TextProperty;
