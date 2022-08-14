import { Box, Flex } from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { Element, ElementTypeKeys } from "../../utils/config";
import Main from "../Elements/GenericElement";
import AddElementPopover from "./AddElementPopover";
import ElementSettingsPopover from "./ElementSettingsPopover";

interface PageItemProps {
  element: Element<any>;
  onDragStart: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  addElement: (type: ElementTypeKeys, index: number) => void;
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
        {props.isEdit && (
          <Flex
            height={"full"}
            onPointerDown={(e) => controls.start(e)}
            position="absolute"
            left="-10"
            my={-2}
            alignItems={"center"}
            opacity={showControls || addElementPopoverOpen ? 1 : 0.2}
          >
            <AddElementPopover
              onOpen={() => setAddElementPopoverOpen(true)}
              onClose={() => setAddElementPopoverOpen(false)}
              addElement={props.addElement}
              atIndex={props.element.index + 1}
            />
            <ElementSettingsPopover
              onOpen={() => setAddElementPopoverOpen(true)}
              onClose={() => setAddElementPopoverOpen(false)}
              element={props.element}
              removeElement={props.removeElement}
              disabled={isDragging}
            />
          </Flex>
        )}
        {/* Element Content */}
        <Flex alignItems="center" width={"full"}>
          <Main elementId={props.element.id} isEdit={props.isEdit} />
        </Flex>
      </Box>
    </Reorder.Item>
  );
};

export default PageItem;
