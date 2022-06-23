import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Text,
  Flex,
  Input,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, useState, useRef } from "react";
import {
  Element,
  ElementType,
  useCreateElementMutation,
  useEditElementPropsMutation,
  useGetDatabasesQuery,
} from "../../generated/graphql";
import {
  DatabaseBaseTypeAttributes,
  DatabaseBaseTypes,
  DatabaseElementProps,
  ElementDefaultProps,
  Property,
  PropertyBase,
  PropertyTypes,
} from "../../utils/elements";

interface ElementSettingsPopoverProps {
  onOpen: () => void;
  onClose: () => void;
  removeElement: (elementId: number) => void;
  element: Element;
  disabled: boolean;
  refetch: () => void | undefined;
}

const ElementSettingsPopover: React.FC<ElementSettingsPopoverProps> = (
  props
) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [, editElement] = useEditElementPropsMutation();

  return (
    <Popover
      autoFocus={false}
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        props.onClose();
      }}
    >
      <PopoverTrigger>
        <Button
          size={"xs"}
          height={8}
          width={2}
          backgroundColor={"white"}
          variant="outline"
          onClick={(e) => {
            if (!props.disabled) {
              onToggle();
              props.onOpen();
            }
          }}
        >
          <DragHandleIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {Object.keys(props.element.props).map((propName) => {
            const elementProp = props.element.props[propName];
            const propShowInSettings = elementProp.showInSettings;
            if (!propShowInSettings) {
              return <></>;
            }
            return (
              <ElementSetting
                key={propName}
                prop={elementProp}
                propName={propName}
                elementId={props.element.id}
                refetch={props.refetch}
              />
            );
          })}
          <Button
            size={"xs"}
            variant="outline"
            onClick={() => props.removeElement(props.element.id)}
          >
            Remove
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface ElementSettingProps {
  prop: Property;
  propName: string;
  elementId: number;
  refetch: () => void | undefined;
}

const ElementSetting: React.FC<ElementSettingProps> = (props) => {
  const [value, setValue] = useState<any>(props.prop.value);

  const [, editElement] = useEditElementPropsMutation();

  return (
    <Flex direction={"row"} alignItems="center" mb={2}>
      <Text mr={2}>{props.prop.friendly}:</Text>
      {props.prop.type === PropertyTypes.DatabaseID ? (
        <DatabaseSelect
          value={value}
          onChange={async (v: string) => {
            setValue(v);
            const newProps: any = {};
            newProps[props.propName] = {
              ...props.prop,
              value: parseInt(v),
            };

            await editElement({
              elementId: props.elementId,
              props: newProps,
            });
            if (props.refetch) {
              props.refetch();
            }
          }}
        />
      ) : (
        <Input
          value={value}
          type={props.prop.type === PropertyTypes.Number ? "number" : "text"}
          onChange={async (e) => {
            setValue(e.target.value);
            const newProps: any = {};
            newProps[props.propName] = {
              ...props.prop,
              value:
                props.prop.type === PropertyTypes.Number
                  ? parseInt(e.target.value)
                  : e.target.value,
            };

            await editElement({
              elementId: props.elementId,
              props: newProps,
            });
            if (props.refetch) {
              props.refetch();
            }
          }}
        />
      )}
    </Flex>
  );
};

interface DatabaseSelectProps {
  value: any;
  onChange: (v: string) => void;
}

const DatabaseSelect: React.FC<DatabaseSelectProps> = (props) => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const [{ data: databasesQuery }] = useGetDatabasesQuery();
  const cancelAddRef = useRef();
  const [newDatabaseName, setNewDatabaseName] = useState<string>("");
  const [newDatabaseBaseType, setNewDatabaseBaseType] =
    useState<DatabaseBaseTypes>(DatabaseBaseTypes.Page);

  const [, createElement] = useCreateElementMutation();

  return (
    <>
      <Select
        placeholder="Select Database"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
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
                      e.target.value as unknown as DatabaseBaseTypes
                    );
                  }}
                  value={newDatabaseBaseType}
                >
                  {Object.keys(DatabaseBaseTypes).map((type) => {
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
              <Button ref={cancelAddRef} colorScheme="red" onClick={onAddClose}>
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
                    DatabaseBaseTypeAttributes[newDatabaseBaseType];

                  const newDatabase = await createElement({
                    index: 0,
                    type: ElementType.Database,
                    props: newDatabaseProps,
                  });
                  if (newDatabase.data?.createElement) {
                    props.onChange(newDatabase.data.createElement.id + "");
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

export default ElementSettingsPopover;
