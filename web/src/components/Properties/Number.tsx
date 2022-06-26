import { Input, Text } from "@chakra-ui/react";

interface NumberPropertyProps {
  value: number;
  onChange: (v: number) => void;
  isEdit: boolean;
}

const NumberProperty: React.FC<NumberPropertyProps> = (props) => {
  if (!props.isEdit) {
    return <Text>{props.value}</Text>;
  } else {
    return (
      <Input
        value={props.value}
        type={"text"}
        onChange={async (e) => {
          props.onChange(parseInt(e.target.value));
        }}
      />
    );
  }
};

export default NumberProperty;
