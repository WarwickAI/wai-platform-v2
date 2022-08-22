import { Input, Text } from "@chakra-ui/react";

interface ImagePropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const ImageProperty: React.FC<ImagePropertyProps> = (props) => {
  if (!props.isEdit) {
    return <Text>{props.value}</Text>;
  } else {
    return (
      <Input
        value={props.value}
        type={"text"}
        onChange={async (e) => {
          props.onChange(e.target.value);
        }}
      />
    );
  }
};

export default ImageProperty;
