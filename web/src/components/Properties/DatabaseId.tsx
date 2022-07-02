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
  ElementType,
  useCreateElementMutation,
  useGetDatabasesWithoutContentQuery,
} from "../../generated/graphql";
import {
  DatabaseElementProps,
  DatabaseBaseTypes,
  createDefaultElementProps,
} from "../../utils/elements";

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
  const [{ data: databasesQuery }] = useGetDatabasesWithoutContentQuery();
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();
  const [newDatabaseName, setNewDatabaseName] = useState<string>("");
  const [newDatabaseBaseType, setNewDatabaseBaseType] = useState<ElementType>(
    ElementType.Page
  );

  const [, createElement] = useCreateElementMutation();

  if (!props.isEdit) {
    return (
      <>
        {databasesQuery &&
          databasesQuery?.getDatabases[
            databasesQuery.getDatabases.findIndex((db) => db.id === props.value)
          ].props.title.value}
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
          const databaseProps = database.props as DatabaseElementProps;
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
                      e.target.value as unknown as ElementType
                    );
                  }}
                  value={newDatabaseBaseType as string}
                >
                  {DatabaseBaseTypes.map((type) => {
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
                  const newDatabaseProps = createDefaultElementProps(
                    ElementType.Database
                  );
                  newDatabaseProps.title.value = newDatabaseName;
                  newDatabaseProps.contentBaseType.value = newDatabaseBaseType;
                  newDatabaseProps.attributes.value =
                    createDefaultElementProps(newDatabaseBaseType);

                  const newDatabase = await createElement({
                    index: 0,
                    type: ElementType.Database,
                    props: newDatabaseProps,
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
