import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  Tooltip,
} from "@chakra-ui/react";
import { ElementTypeKeys, ElementTypesDef, ElementTypesToNotShowInAdd } from "../../utils/config";

interface AddElementPopoverProps {
  onOpen: () => void;
  onClose: () => void;
  addElement: (type: ElementTypeKeys, index: number) => void;
  atIndex: number;
}

const AddElementPopover: React.FC<AddElementPopoverProps> = (props) => {
  return (
    <Popover onOpen={() => props.onOpen()} onClose={() => props.onClose()}>
      <PopoverTrigger>
        <Button
          size={"xs"}
          height={6}
          width={10}
          backgroundColor={"white"}
          variant="outline"
        >
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {Object.keys(ElementTypesDef).map((type) => {
            if (ElementTypesToNotShowInAdd.includes(type as ElementTypeKeys)) {
              return <></>;
            }
            return (
              <Tooltip key={type} label={type}>
                <Button
                  size={"xs"}
                  m={1}
                  p={2}
                  variant="outline"
                  onClick={() => {
                    props.addElement(type as ElementTypeKeys, props.atIndex);
                  }}
                >
                  {type}
                </Button>
              </Tooltip>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddElementPopover;
