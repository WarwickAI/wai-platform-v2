import { useRadioGroup, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGetElementQuery } from "../../../generated/graphql";
import {
  DatabaseViewAsKeys,
  DatabaseViewsAs,
} from "../../../utils/base_data_types";
import { DatabaseElementData } from "../../../utils/base_element_types";
import { Element } from "../../../utils/config";
import RadioItem from "../../Utils/RadioItem";

interface DatabaseViewAsPropertyProps {
  element: Element<any>;
  value: DatabaseViewAsKeys;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const DatabaseViewAsProperty: React.FC<DatabaseViewAsPropertyProps> = (
  props
) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "databaseViewAs",
    value: props.value,
    onChange: (v) => props.onChange(v as DatabaseViewAsKeys),
  });

  const [{ data: databaseQuery }] = useGetElementQuery({
    variables: {
      elementId: props.element.data.database.value,
    },
  });

  const database = useMemo(() => {
    if (databaseQuery?.getElement) {
      return databaseQuery.getElement as Element<DatabaseElementData>;
    }
    return undefined;
  }, [databaseQuery?.getElement]);

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

        // Certain views are not available for certain databases
        if (
          viewAs.limitToChildTypes &&
          !viewAs.limitToChildTypes.includes(
            database?.data.childrenBaseType.value
          )
        ) {
          return null;
        }

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
