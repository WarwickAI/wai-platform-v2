import {
  Button,
  Flex,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useGetDatabasesWithoutChildrenQuery,
} from "../../../generated/graphql";
import { DatabaseElementData } from "../../../utils/base_element_types";
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
  const [{ data: databasesQuery }] = useGetDatabasesWithoutChildrenQuery();

  if (!props.isEdit) {
    return (
      <>
        {databasesQuery &&
          databasesQuery?.getDatabases[
            databasesQuery.getDatabases.findIndex((db) => db.id === props.value)
          ].data.title.value}
      </>
    );
  }

  return (
    <Flex direction={"row"}>
      <Select
        placeholder="Select Database"
        value={props.value}
        onChange={(e) => props.onChange(parseInt(e.target.value))}
      >
        {databasesQuery?.getDatabases.map((database) => {
          const databaseProps = database.data as DatabaseElementData;
          return (
            <option key={database.id} value={database.id}>
              {databaseProps.title.value}
            </option>
          );
        })}
      </Select>
      <Button variant="primary" onClick={onAddOpen}>
        +
      </Button>
      <CreateDatabaseWindow
        isOpen={isAddOpen}
        onOpen={onAddOpen}
        onClose={onAddClose}
        onChange={props.onChange}
      />
    </Flex>
  );
};

export default DatabaseProperty;
