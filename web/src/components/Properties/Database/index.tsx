import { Button, useDisclosure, useRadioGroup, VStack } from "@chakra-ui/react";
import { useGetElementsQuery } from "../../../generated/graphql";
import { DatabaseElementData } from "../../../utils/base_element_types";
import RadioItem from "../../Utils/RadioItem";
import CreateDatabaseWindow from "./CreateDatabaseWindow";

interface DatabasePropertyProps {
  value: number;
  onChange: (v: number) => void;
  isEdit: boolean;
}

const DatabaseProperty: React.FC<DatabasePropertyProps> = (props) => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const [{ data: databasesQuery }] = useGetElementsQuery({
    variables: { type: "Database", children: true },
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "database",
    value: props.value,
    onChange: (v) => props.onChange(parseInt(v)),
  });

  const group = getRootProps();

  if (!props.isEdit) {
    return (
      <>
        {databasesQuery &&
          databasesQuery?.getElements[
            databasesQuery.getElements.findIndex((db) => db.id === props.value)
          ].data.title.value}
      </>
    );
  }
  return (
    <VStack {...group} spacing={1} w={"full"} h={80} overflowY={"scroll"}>
      {databasesQuery?.getElements.map((database) => {
        const databaseProps = database.data as DatabaseElementData;
        const radio = getRadioProps({ value: database.id });

        return (
          <RadioItem key={database.id} {...radio} inSettings={true}>
            {databaseProps.title.value}
          </RadioItem>
        );
      })}

      <Button size={"sm"} variant="primary" onClick={onAddOpen}>
        +
      </Button>
      <CreateDatabaseWindow
        isOpen={isAddOpen}
        onOpen={onAddOpen}
        onClose={onAddClose}
        onChange={props.onChange}
      />
    </VStack>
  );
};

export default DatabaseProperty;
