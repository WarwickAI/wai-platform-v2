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
import GenericInput from "../Elements/GenericInput";

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
                element={props.element}
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
  element: Element;
  refetch: () => void | undefined;
}

const ElementSetting: React.FC<ElementSettingProps> = (props) => {
  const [value, setValue] = useState<any>(props.prop.value);

  const [, editElement] = useEditElementPropsMutation();

  return (
    <Flex direction={"row"} alignItems="center" mb={2}>
      <Text mr={2} whiteSpace={"nowrap"}>
        {props.prop.friendly}:
      </Text>

      <GenericInput
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
          if (props.refetch) {
            props.refetch();
          }
        }}
      />
    </Flex>
  );
};

export default ElementSettingsPopover;
