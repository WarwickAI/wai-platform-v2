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
  useEditElementPropsMutation,
  useGetDatabasesQuery,
} from "../../generated/graphql";
import {
  DatabaseBaseTypes,
  DatabaseElementProps,
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
          onChange={async (e) => {
            setValue(e.target.value);
            const newProps: any = {};
            newProps[props.propName] = {
              ...props.prop,
              value: parseInt(e.target.value),
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
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
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

  return (
    <>
      <Select
        placeholder="Select Database"
        value={props.value}
        onChange={props.onChange}
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
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelAddRef} colorScheme="red" onClick={onAddClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onAddClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ElementSettingsPopover;
