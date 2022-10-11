import { Box, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  Group,
  useGetElementQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import { Element, ElementTypeKeys } from "../../utils/config";
import { checkPermissions } from "../../utils/isAuth";
import GenericElement from "../Elements/GenericElement";
import AddElementPopover from "./AddElementPopover";
import ElementSettingsPopover from "./ElementSettingsPopover";
import { useDrop, useDrag } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

interface PageItemProps {
  element: Element<any>;
  addElement: (type: ElementTypeKeys, index: number) => void;
  removeElement: (elementId: number) => void;
  isEdit: boolean;
  index: number;
  moveCard: any;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const PageItem: React.FC<PageItemProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [addElementPopoverOpen, setAddElementPopoverOpen] =
    useState<boolean>(false);
  const [{ data: parentQuery }] = useGetElementQuery({
    variables: { elementId: props.element.parent?.id || -1, children: true },
    pause: !props.element.parent?.id,
  });
  const [{ data: meQuery }] = useMeQuery();

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: props.element.id, index: props.element.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Box
      key={props.element.id}
      ref={ref}
      data-handler-id={handlerId}
      opacity={opacity}
      onMouseOver={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Box position="relative" my={2}>
        {/* Element Controls */}
        {props.isEdit && (
          <Flex
            justifyContent={"center"}
            height={10}
            position="absolute"
            left={-12}
            alignItems={"center"}
            opacity={showControls || addElementPopoverOpen ? 1 : 0.2}
          >
            {parentQuery?.getElement &&
              checkPermissions(
                parentQuery?.getElement.canEditGroups as Group[],
                meQuery?.me as User | undefined
              ) && (
                <AddElementPopover
                  isOpen={addElementPopoverOpen}
                  setOpen={(v) => setAddElementPopoverOpen(v)}
                  onOpen={() => setAddElementPopoverOpen(true)}
                  onClose={() => setAddElementPopoverOpen(false)}
                  addElement={props.addElement}
                  atIndex={props.element.index + 1}
                />
              )}
            {checkPermissions(
              props.element.canEditGroups as Group[],
              meQuery?.me as User | undefined
            ) && (
              <ElementSettingsPopover
                onOpen={() => setAddElementPopoverOpen(true)}
                onClose={() => setAddElementPopoverOpen(false)}
                element={props.element}
                removeElement={props.removeElement}
                disabled={isDragging}
              />
            )}
          </Flex>
        )}
        {/* Element Content */}
        <Flex alignItems="center" width={"full"}>
          <GenericElement element={props.element} isEdit={props.isEdit} />
        </Flex>
      </Box>
    </Box>
  );
};

export default PageItem;
