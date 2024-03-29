import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import {
  ElementTypeKeys,
  ElementTypesDef,
  ElementTypesToNotShowInAdd,
} from "../../utils/config";

import { AddIcon } from "@chakra-ui/icons";

interface AddElementPopoverProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  addElement: (type: ElementTypeKeys, index: number) => void;
  atIndex: number;
}

const AddElementPopover: React.FC<AddElementPopoverProps> = (props) => {
  return (
    <Popover
      isOpen={props.isOpen}
      onOpen={() => props.onOpen()}
      returnFocusOnClose={false}
      onClose={() => props.onClose()}
    >
      <PopoverTrigger>
        <Box
          h={6}
          w={6}
          p={1}
          borderRadius={"md"}
          textAlign={"center"}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          _hover={{ cursor: "pointer", backgroundColor: "gray.200" }}
          onClick={() => props.setOpen(true)}
        >
          <AddIcon />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {Object.keys(ElementTypesDef).map((type) => {
            if (ElementTypesToNotShowInAdd.includes(type as ElementTypeKeys)) {
              return;
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
                    props.setOpen(false);
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
