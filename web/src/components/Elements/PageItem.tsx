import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { Element, ElementType } from "../../generated/graphql";
import Main from "./Main";
import { DragHandleIcon } from "@chakra-ui/icons";
import AddElementPopover from "./AddElementPopover";

interface PageItemProps {
  element: Element;
  onDragStart: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  addElement: (type: ElementType, index: number) => void;
  removeElement: (elementId: number) => void;
}

const PageItem: React.FC<PageItemProps> = (props) => {
  const controls = useDragControls();
  const [showControls, setShowControls] = useState<boolean>(false);
  const [addElementPopoverOpen, setAddElementPopoverOpen] =
    useState<boolean>(false);

  return (
    <Reorder.Item
      key={props.element.id}
      value={props.element}
      as="div"
      dragListener={false}
      dragControls={controls}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      onHoverStart={() => setShowControls(true)}
      onHoverEnd={() => setShowControls(false)}
    >
      <Box position="relative" p={2} my={2}>
        {/* Element Controls */}
        {(showControls || addElementPopoverOpen) && (
          <Flex
            height={"full"}
            onPointerDown={(e) => controls.start(e)}
            position="absolute"
            left="-5"
            my={-2}
            alignItems={"center"}
          >
            <Popover
              onOpen={() => setAddElementPopoverOpen(true)}
              onClose={() => setAddElementPopoverOpen(false)}
            >
              <PopoverTrigger>
                <Button
                  size={"xs"}
                  height={8}
                  width={2}
                  backgroundColor={"white"}
                  variant="outline"
                >
                  <DragHandleIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody>
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
          </Flex>
        )}
        {/* Element Content */}
        <Flex alignItems="center">
          <Main elementId={props.element.id} />
        </Flex>
        {(showControls || addElementPopoverOpen) && (
          <Flex
            position={"absolute"}
            justifyContent={"center"}
            width={"full"}
            zIndex={1}
          >
            <AddElementPopover
              onOpen={() => setAddElementPopoverOpen(true)}
              onClose={() => setAddElementPopoverOpen(false)}
              addElement={props.addElement}
              atIndex={props.element.index + 1}
            />
          </Flex>
        )}
      </Box>
    </Reorder.Item>
  );
};

export default PageItem;
