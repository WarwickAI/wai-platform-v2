import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  useCreateElementMutation,
  useGetDatabasesWithoutChildrenQuery,
} from "../../generated/graphql";
import { DatabaseBaseTypeValue } from "../../utils/base_data_types";
import { DatabaseElementData } from "../../utils/base_element_types";
import { createDefaultElementData, ElementTypesDef } from "../../utils/config";

interface DatabaseIdPropertyProps {
  value: number;
  onChange: (v: number) => void;
  isEdit: boolean;
}

const DatabaseIdProperty: React.FC<DatabaseIdPropertyProps> = (props) => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const [{ data: databasesQuery }] = useGetDatabasesWithoutChildrenQuery();
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();
  const [newDatabaseName, setNewDatabaseName] = useState<string>("");
  const [newDatabaseBaseType, setNewDatabaseBaseType] =
    useState<DatabaseBaseTypeValue>("Page");

  const [, createElement] = useCreateElementMutation();

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
    <>
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

      <AlertDialog
        isOpen={isAddOpen}
        // @ts-ignore
        leastDestructiveRef={cancelAddRef}
        onClose={onAddClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Create New Database
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex direction={"row"} alignItems="center" mb={2}>
                <Text mr={2} whiteSpace="nowrap">
                  Name:
                </Text>
                <Input
                  onChange={(e) => {
                    setNewDatabaseName(e.target.value);
                  }}
                  value={newDatabaseName}
                />
              </Flex>
              <Flex direction={"row"} alignItems="center" mb={2}>
                <Text mr={2} whiteSpace="nowrap">
                  Base Type:
                </Text>
                <Select
                  onChange={(e) => {
                    setNewDatabaseBaseType(
                      e.target.value as DatabaseBaseTypeValue
                    );
                  }}
                  value={newDatabaseBaseType}
                >
                  {Object.keys(ElementTypesDef).map((type) => {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                // @ts-ignore
                ref={cancelAddRef}
                colorScheme="red"
                onClick={onAddClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                ml={3}
                onClick={async () => {
                  // Create new database, and set to be database for database view
                  const newDatabaseData = createDefaultElementData("Database") as DatabaseElementData;
                  newDatabaseData.title.value = newDatabaseName;
                  newDatabaseData.childrenBaseType.value = newDatabaseBaseType;
                  newDatabaseData.attributes.value =
                    createDefaultElementData(newDatabaseBaseType);

                  const newDatabase = await createElement({
                    index: 0,
                    type: "Database",
                    data: newDatabaseData,
                  });
                  if (newDatabase.data?.createElement) {
                    props.onChange(newDatabase.data.createElement.id);
                  }
                  onAddClose();
                }}
              >
                Create
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DatabaseIdProperty;
