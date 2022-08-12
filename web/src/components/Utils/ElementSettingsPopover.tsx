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
} from "@chakra-ui/react";
import { useState } from "react";
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

  return (
    <Popover
      autoFocus={true}
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
          {Object.keys(props.element.data).map((dataPieceName) => {
            const elementDataPiece = props.element.data[
              dataPieceName
            ] as ElementDataPiece<any>;
            if (
              ElementTypesDef[props.element.type].data[dataPieceName]
                ?.inSettings
            ) {
              return (
                <ElementSetting
                  key={dataPieceName}
                  elementDataPiece={elementDataPiece}
                  dataPieceName={dataPieceName}
                  element={props.element}
                />
              );
            } else {
              return;
            }
          })}
          <PermissionsEdit element={props.element} />
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
  elementDataPiece: ElementDataPiece<any>;
  dataPieceName: string;
  element: Element<any>;
}

const ElementSetting: React.FC<ElementSettingProps> = (props) => {
  const [value, setValue] = useState<any>(props.elementDataPiece.value);

  const [, editElement] = useEditElementDataMutation();

  return (
    <Flex direction={"row"} alignItems="center" mb={2}>
      <Text mr={2} whiteSpace={"nowrap"}>
        {ElementTypesDef[props.element.type].data[props.dataPieceName]?.label ||
          props.dataPieceName}
        :
      </Text>

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
    </Flex>
  );
};

export default ElementSettingsPopover;
