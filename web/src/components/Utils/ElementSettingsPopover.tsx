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
} from "@chakra-ui/react";
import { Element, useEditElementPropsMutation } from "../../generated/graphql";
import { ElementSettingOptions, PropertyTypes } from "../../utils/elements";

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
            const propType = props.element.props[propName].type;
            const propValue = props.element.props[propName].value;
            return (
              <Flex direction={"row"} key={propName} alignItems="center" mb={2}>
                <Text mr={2}>{propName}:</Text>
                <Input
                  value={propValue}
                  type={propType === PropertyTypes.Text ? "text" : "number"}
                  onChange={async (e) => {
                    const newProps: any = {};
                    newProps[propName] = {
                      type: propType,
                      value: parseInt(e.target.value),
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

export default ElementSettingsPopover;
