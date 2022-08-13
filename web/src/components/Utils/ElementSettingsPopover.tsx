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
import { useEditElementDataMutation } from "../../generated/graphql";
import { Element, ElementDataPiece, ElementTypesDef } from "../../utils/config";
import GenericProperty from "../Properties/GenericProperty";
import PermissionsEdit from "./PermissionsEdit";

interface ElementSettingsPopoverProps {
  onOpen: () => void;
  onClose: () => void;
  removeElement: (elementId: number) => void;
  element: Element<any>;
  disabled: boolean;
}

const ElementSettingsPopover: React.FC<ElementSettingsPopoverProps> = (
  props
) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

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
      <PopoverContent w={40} p={0}>
        <PopoverBody m={2} p={0}>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={1}>
            {attributes.length > 0 && (
              <VStack w={"full"}>
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
              </VStack>
            )}
            <PermissionsEdit element={props.element} />
            <Button
              size={"sm"}
              variant="setting"
              onClick={() => props.removeElement(props.element.id)}
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
}

const ElementSetting: React.FC<ElementSettingProps> = (props) => {
  const [value, setValue] = useState<any>(props.elementDataPiece.value);

  const [, editElement] = useEditElementDataMutation();

  return (
    <Popover autoFocus={true} placement={"right"}>
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

              await editElement({
                elementId: props.element.id,
                data: newData,
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
