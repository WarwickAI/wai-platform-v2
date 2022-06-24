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
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { elementDragControls } from "framer-motion/types/gestures/drag/VisualElementDragControls";
import { useRef, useState } from "react";
import {
  ElementType,
  useCreateElementMutation,
  useGetDatabasesQuery,
  useGetElementQuery,
  Element,
} from "../../generated/graphql";
import {
  DatabaseBaseTypes,
  DatabaseElementProps,
  ElementDefaultProps,
  PropertyTypes,
} from "../../utils/elements";

interface GenericInputProps {
  element: Element;
  value: any;
  type: PropertyTypes;
  onChange: (v: any) => void;
}

const GenericInput: React.FC<GenericInputProps> = (
  props: GenericInputProps
) => {
  const value = props.value + "";
  if (props.type === PropertyTypes.Text || props.type === PropertyTypes.Url) {
    return <TextInput value={props.value} onChange={props.onChange} />;
  }
  if (props.type === PropertyTypes.Number) {
    return <NumberInput value={props.value} onChange={props.onChange} />;
  }
  if (props.type === PropertyTypes.DatabaseID) {
    return <DatabaseInput value={props.value} onChange={props.onChange} />;
  }
  if (props.type === PropertyTypes.PropertyLink) {
    return (
      <PropertyLinkInput
        element={props.element}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }
  return <>{props.type}</>;
};

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <Input
      value={props.value}
      type={"text"}
      onChange={async (e) => {
        props.onChange(e.target.value);
      }}
    />
  );
};

interface NumberInputProps {
  value: number;
  onChange: (v: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
  return (
    <Input
      value={props.value}
      type={"number"}
      onChange={async (e) => {
        props.onChange(parseInt(e.target.value));
      }}
    />
  );
};

interface DatabaseInputProps {
  value: number;
  onChange: (v: number) => void;
}

const DatabaseInput: React.FC<DatabaseInputProps> = (props) => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const [{ data: databasesQuery }] = useGetDatabasesQuery();
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();
  const [newDatabaseName, setNewDatabaseName] = useState<string>("");
  const [newDatabaseBaseType, setNewDatabaseBaseType] = useState<ElementType>(
    ElementType.Page
  );

  const [, createElement] = useCreateElementMutation();

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
                  value={newDatabaseBaseType}
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
                  const newDatabaseProps =
                    ElementDefaultProps[ElementType.Database];
                  newDatabaseProps.title.value = newDatabaseName;
                  newDatabaseProps.contentBaseType.value = newDatabaseBaseType;
                  newDatabaseProps.attributes.value =
                    ElementDefaultProps[newDatabaseBaseType];

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

interface PropertyLinkProps {
  element: Element;
  value: string;
  onChange: (v: string) => void;
}

const PropertyLinkInput: React.FC<PropertyLinkProps> = (props) => {
  const [{ data: parentQuery }] = useGetElementQuery({
    variables: {
      elementId: props.element.parent ? props.element.parent.id : -1,
    },
  });

  return (
    <>
      <Select
        placeholder="Select Property"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {parentQuery?.getElement &&
          Object.keys(parentQuery?.getElement.props).map((propertyName) => {
            const property = parentQuery?.getElement.props[propertyName];
            return (
              <option key={propertyName} value={propertyName}>
                {property.friendly}
              </option>
            );
          })}
      </Select>
    </>
  );
};

export default GenericInput;
