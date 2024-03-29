import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Box,
  VStack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  useEditElementDataMutation,
  useEditElementRouteMutation,
  useGetElementQuery,
} from "../../generated/graphql";
import {
  DatabaseElementData,
  DatabaseViewElementData,
  PageElementData,
} from "../../utils/base_element_types";
import {
  DataTypeKeysT,
  Element,
  ElementDataPiece,
  ElementTypeKeys,
  ElementTypesDef,
} from "../../utils/config";
import GenericProperty from "../Properties/GenericProperty";
import PermissionsEdit from "./PermissionsEdit";

interface ElementSettingsPopoverProps {
  onOpen: () => void;
  onClose: () => void;
  removeElement: (elementId: number) => void;
  element: Element<any>;
  hideAttributes?: boolean;
  disabled: boolean;
  extraAttributes?: {
    key: string;
    label: string;
    type: DataTypeKeysT;
    value: any;
    editValue: (value: any) => void;
  }[];
}

const ElementSettingsPopover: React.FC<ElementSettingsPopoverProps> = (
  props
) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [{ data: databaseQuery }] = useGetElementQuery({
    variables: {
      elementId:
        (props.element.type === "DatabaseView" &&
          (props.element.data as DatabaseViewElementData).database?.value) ||
        -1,
    },
    pause:
      props.element.type !== "DatabaseView" ||
      !(props.element.data as DatabaseViewElementData).database?.value,
  });

  const database = useMemo(() => {
    if (
      databaseQuery?.getElement &&
      databaseQuery?.getElement.type === "Database"
    ) {
      return databaseQuery.getElement as Element<DatabaseElementData>;
    }
    return;
  }, [databaseQuery?.getElement]);

  const attributes = useMemo(() => {
    var attributes = Object.keys(props.element.data).map((attributeName) => {
      const att = props.element.data[attributeName];
      att.attributeName = attributeName;
      return att;
    });
    var attributes = attributes.filter((att) => {
      return ElementTypesDef[props.element.type].data[att.attributeName]
        ?.inSettings;
    });

    return attributes;
  }, [props.element.data, props.element.type]);

  const dbAttributes = useMemo(() => {
    if (!database) {
      return [];
    }

    var attributes = Object.keys(database.data).map((attributeName) => {
      const att = database.data[attributeName];
      att.attributeName = attributeName;
      return att;
    });
    var attributes = attributes.filter((att) => {
      return ElementTypesDef[database.type as ElementTypeKeys].data[
        att.attributeName
      ]?.inSettings;
    });

    return attributes;
  }, [database]);

  return (
    <Popover
      autoFocus={true}
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        props.onClose();
      }}
      placement={"left"}
      gutter={4}
    >
      <PopoverTrigger>
        <Box
          h={6}
          w={4}
          p={1}
          borderRadius={"md"}
          textAlign={"center"}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          _hover={{ cursor: "grab", backgroundColor: "gray.200" }}
          onClick={(e) => {
            if (!props.disabled) {
              onToggle();
              props.onOpen();
            }
          }}
        >
          <DragHandleIcon />
        </Box>
      </PopoverTrigger>
      <PopoverContent w={40}>
        <PopoverBody>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={1}>
            {!props.hideAttributes && attributes.length > 0 && (
              <VStack w={"full"} spacing={1}>
                <Text>Attributes</Text>
                {attributes.map((att) => {
                  return (
                    <ElementSetting
                      key={att.attributeName}
                      elementDataPiece={att}
                      dataPieceName={att.attributeName}
                      element={props.element}
                    />
                  );
                })}
                {props.element.type === "Page" && (
                  <EditRoute
                    element={props.element as Element<PageElementData>}
                  />
                )}
              </VStack>
            )}
            {!props.hideAttributes && dbAttributes.length > 0 && (
              <VStack w={"full"} spacing={1}>
                <Text>DB Attributes</Text>
                {dbAttributes.map((att) => {
                  return (
                    <ElementSetting
                      key={att.attributeName}
                      elementDataPiece={att}
                      dataPieceName={att.attributeName}
                      element={database as Element<any>}
                    />
                  );
                })}
                {database && <PermissionsEdit element={database} />}
              </VStack>
            )}
            {!props.hideAttributes &&
              props.extraAttributes &&
              props.extraAttributes.length > 0 && (
                <VStack w={"full"} spacing={1}>
                  <Text>Other Attributes</Text>
                  {props.extraAttributes.map((att) => {
                    return (
                      <ElementSetting
                        key={att.key}
                        elementDataPiece={{
                          type: att.type,
                          value: att.value,
                        }}
                        dataPieceName={att.label}
                        element={props.element as Element<any>}
                        editValue={att.editValue}
                      />
                    );
                  })}
                </VStack>
              )}
            <PermissionsEdit element={props.element} />
            <Button
              size={"sm"}
              variant="setting"
              onClick={() => props.removeElement(props.element.id)}
              disabled={!props.element.parent}
            >
              Remove
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface ElementSettingProps {
  elementDataPiece: ElementDataPiece<any>;
  dataPieceName: string;
  element: Element<any>;
  editValue?: (value: any) => void;
}

const ElementSetting: React.FC<ElementSettingProps> = (props) => {
  const [value, setValue] = useState<any>(props.elementDataPiece.value);

  const [, editElement] = useEditElementDataMutation();

  return (
    <Popover
      autoFocus={true}
      returnFocusOnClose={false}
      placement={"right"}
      gutter={16}
    >
      <PopoverTrigger>
        <Button size={"sm"} variant="setting">
          {ElementTypesDef[props.element.type].data[props.dataPieceName]
            ?.label || props.dataPieceName}
        </Button>
      </PopoverTrigger>
      <PopoverContent w={80}>
        <PopoverBody>
          <GenericProperty
            element={props.element}
            value={value}
            type={props.elementDataPiece.type}
            onChange={async (v) => {
              setValue(v);
              const newData: any = {};
              newData[props.dataPieceName] = {
                ...props.elementDataPiece,
                value: v,
              };
              if (!props.editValue) {
                await editElement({
                  elementId: props.element.id,
                  data: newData,
                });
              } else {
                props.editValue(v);
              }
            }}
            isEdit={true}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface EditRouteProps {
  element: Element<PageElementData>;
}

const EditRoute: React.FC<EditRouteProps> = (props) => {
  const route = props.element.route;

  const [, editElement] = useEditElementRouteMutation();

  return (
    <Popover
      autoFocus={true}
      returnFocusOnClose={false}
      placement={"right"}
      gutter={16}
    >
      <PopoverTrigger>
        <Button size={"sm"} variant="setting">
          Route
        </Button>
      </PopoverTrigger>
      <PopoverContent w={80}>
        <PopoverBody>
          <GenericProperty
            element={props.element}
            value={route}
            type={"Text"}
            onChange={async (v) => {
              await editElement({
                elementId: props.element.id,
                route: v as string,
              });
            }}
            isEdit={true}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ElementSettingsPopover;
