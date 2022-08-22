import { useDisclosure, useRadioGroup, VStack } from "@chakra-ui/react";
import {
  DatabaseViewAsKeys,
  DatabaseViewsAs,
} from "../../../utils/base_data_types";
import RadioItem from "../../Utils/RadioItem";

interface DatabaseViewAsPropertyProps {
  value: DatabaseViewAsKeys;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const DatabaseViewAsProperty: React.FC<DatabaseViewAsPropertyProps> = (
  props
) => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "databaseViewAs",
    value: props.value,
    onChange: (v) => props.onChange(v as DatabaseViewAsKeys),
  });

  const group = getRootProps();

  if (!props.isEdit) {
    return <>{DatabaseViewsAs[props.value].label}</>;
  }
  return (
    <VStack {...group} spacing={1} w={"full"} h={80} overflowY={"scroll"}>
      {Object.keys(DatabaseViewsAs).map((viewAsName) => {
        const viewAs = DatabaseViewsAs[viewAsName as DatabaseViewAsKeys];
        const radio = getRadioProps({
          value: viewAsName as DatabaseViewAsKeys,
        });

        return (
          <RadioItem key={viewAsName} {...radio} inSettings={true}>
            {viewAs.label}
          </RadioItem>
        );
      })}
    </VStack>
  );
};

export default DatabaseViewAsProperty;
