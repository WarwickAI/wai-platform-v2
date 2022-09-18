import { Button, useDisclosure, useRadioGroup, VStack } from "@chakra-ui/react";
import {
  actionTypeKeys,
  ActionTypeKeys,
  ActionTypesDef,
} from "../../../utils/base_data_types";
import RadioItem from "../../Utils/RadioItem";

interface ActionTypePropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const ActionTypeProperty: React.FC<ActionTypePropertyProps> = (props) => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "actionType",
    value: props.value,
    onChange: (v) => props.onChange(v),
  });

  const group = getRootProps();

  if (!props.isEdit) {
    return <>{ActionTypesDef[props.value as ActionTypeKeys].label}</>;
  }
  return (
    <VStack {...group} spacing={1} w={"full"} h={80} overflowY={"scroll"}>
      {actionTypeKeys.map((actionTypeName) => {
        const actionType = ActionTypesDef[actionTypeName];
        const radio = getRadioProps({ value: actionTypeName });

        return (
          <RadioItem key={actionTypeName} {...radio} inSettings={true}>
            {actionType.label}
          </RadioItem>
        );
      })}
    </VStack>
  );
};

export default ActionTypeProperty;
