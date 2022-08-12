import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  Flex,
  Input,
  AlertDialogFooter,
  Button,
  useDisclosure,
  Text,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useCreateElementMutation } from "../../../generated/graphql";
import { DatabaseBaseTypeValue } from "../../../utils/base_data_types";
import {
  ElementTypesDef,
  DatabaseElementData,
} from "../../../utils/base_element_types";
import { createDefaultElementData } from "../../../utils/config";

interface CreateDatabaseWindowProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (v: number) => void;
}

const CreateDatabaseWindow: React.FC<CreateDatabaseWindowProps> = (
  props: any
) => {
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();
  const [newDatabaseName, setNewDatabaseName] = useState<string>("");
  const [newDatabaseBaseType, setNewDatabaseBaseType] =
    useState<DatabaseBaseTypeValue>("Page");

  const [, createElement] = useCreateElementMutation();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      // @ts-ignore
      leastDestructiveRef={cancelAddRef}
      onClose={props.onClose}
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
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              ml={3}
              onClick={async () => {
                // Create new database, and set to be database for database view
                const newDatabaseData = createDefaultElementData(
                  "Database"
                ) as DatabaseElementData;
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
                props.onClose();
              }}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CreateDatabaseWindow;
