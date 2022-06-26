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
  propNames,
} from "@chakra-ui/react";
import { useState } from "react";
import { Element, useEditElementPropsMutation } from "../../generated/graphql";
import {
  ElementPropertyInfo,
  GeneralPropertyInfo,
  Property,
} from "../../utils/elements";
import GenericProperty from "../Properties/GenericProperty";
import PermissionsEdit from "./PermissionsEdit";

interface ElementSettingsPopoverProps {
  onOpen: () => void;
  onClose: () => void;
  removeElement: (elementId: number) => void;
  element: Element;
  disabled: boolean;
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
            const elementProp = props.element.props[propName] as Property;
            const propShowInSettings = ElementPropertyInfo[props.element.type][
              propName
            ]
              ? ElementPropertyInfo[props.element.type][propName].showInSettings
              : GeneralPropertyInfo[elementProp.type];
            if (!propShowInSettings) {
              return <></>;
            }
            return (
              <ElementSetting
                key={propName}
                prop={elementProp}
                propName={propName}
                element={props.element}
              />
            );
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
  prop: Property;
  propName: string;
  element: Element;
}

const ElementSetting: React.FC<ElementSettingProps> = (props) => {
  const [value, setValue] = useState<any>(props.prop.value);

  const [, editElement] = useEditElementPropsMutation();

  return (
    <Flex direction={"row"} alignItems="center" mb={2}>
      <Text mr={2} whiteSpace={"nowrap"}>
        {ElementPropertyInfo[props.element.type][props.propName]
          ? ElementPropertyInfo[props.element.type][props.propName].label
          : props.propName}
        :
      </Text>

      <GenericProperty
        element={props.element}
        value={value}
        type={props.prop.type}
        onChange={async (v) => {
          setValue(v);
          const newProps: any = {};
          newProps[props.propName] = {
            ...props.prop,
            value: v,
          };

          await editElement({
            elementId: props.element.id,
            props: newProps,
          });
        }}
        isEdit={true}
      />
    </Flex>
  );
};

export default ElementSettingsPopover;
