import { Box, Flex } from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { Element, ElementType } from "../../generated/graphql";
import Main from "./Main";
import AddElementPopover from "../Utils/AddElementPopover";
import ElementSettingsPopover from "../Utils/ElementSettingsPopover";

interface PageItemProps {
  element: Element;
  onDragStart: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  addElement: (type: ElementType, index: number) => void;
  removeElement: (elementId: number) => void;
  isEdit: boolean;
}

const PageItem: React.FC<PageItemProps> = (props) => {
  const controls = useDragControls();
  const [showControls, setShowControls] = useState<boolean>(false);
  const [addElementPopoverOpen, setAddElementPopoverOpen] =
    useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  return (
    <Reorder.Item
      key={props.element.id}
      value={props.element}
      as="div"
      dragListener={false}
      dragControls={controls}
      onDragStart={(e) => {
        props.onDragStart(e);
        setIsDragging(true);
      }}
      onDragEnd={(e) => {
        props.onDragEnd(e);
        setTimeout(() => setIsDragging(false), 100);
      }}
      onHoverStart={() => setShowControls(true)}
      onHoverEnd={() => setShowControls(false)}
    >
      <Box position="relative" p={2} my={2}>
        {/* Element Controls */}
        <Flex
          height={"full"}
          onPointerDown={(e) => controls.start(e)}
          position="absolute"
          left="-5"
          my={-2}
          alignItems={"center"}
          opacity={showControls || addElementPopoverOpen ? 1 : 0.2}
        >
          {props.isEdit && (
            <ElementSettingsPopover
              onOpen={() => setAddElementPopoverOpen(true)}
              onClose={() => setAddElementPopoverOpen(false)}
              element={props.element}
              removeElement={props.removeElement}
              disabled={isDragging}
            />
          )}
        </Flex>
        {/* Element Content */}
        <Flex alignItems="center">
          <Main
            elementId={props.element.id}
            isEdit={props.isEdit}
          />
        </Flex>
        {(showControls || addElementPopoverOpen) && props.isEdit && (
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
