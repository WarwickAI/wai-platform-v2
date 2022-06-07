import {
  Flex,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  propNames,
} from "@chakra-ui/react";
import { ElementType } from "../../generated/graphql";

interface AddElementPopoverProps {
  onOpen: () => void;
  onClose: () => void;
  addElement: (type: ElementType, index: number) => void;
  atIndex: number;
}

const AddElementPopover: React.FC<AddElementPopoverProps> = (props) => {
  return (
    <Flex
      position={"absolute"}
      justifyContent={"center"}
      width={"full"}
      zIndex={1}
    >
      <Popover onOpen={() => props.onOpen()} onClose={() => props.onClose()}>
        <PopoverTrigger>
          <Button
            size={"xs"}
            height={4}
            width={10}
            backgroundColor={"white"}
            variant="outline"
          >
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            {Object.keys(ElementType).map((type) => {
              return (
                <Button
                  size={"xs"}
                  key={type}
                  variant="outline"
                  onClick={() => {
                    props.addElement(type as ElementType, props.atIndex);
                  }}
                >
                  {type}
                </Button>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default AddElementPopover;
