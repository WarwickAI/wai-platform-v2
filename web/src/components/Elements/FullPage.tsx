import React, { useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Element,
  ElementType,
  useCreateElementMutation,
  useEditElementIndexMutation,
  useEditElementPropsMutation,
  useRemoveElementMutation,
} from "../../generated/graphql";
import Main from "./Main";
import { Reorder, useDragControls } from "framer-motion";
import { ElementDefaultProps, PageElementType } from "../../utils/elements";

interface PageProps {
  element: PageElementType;
}

const Page: React.FC<PageProps> = (props) => {
  const elementProps = props.element.props;
  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });
  const oldOrder = useRef(
    props.element.content.sort((a, b) => a.index! - b.index!)
  );
  const [, deleteElement] = useRemoveElementMutation();

  const [items, setItems] = React.useState(
    props.element.content.sort((a, b) => a.index! - b.index!)
  );

  const [, editElement] = useEditElementPropsMutation();
  const [, editElementIndex] = useEditElementIndexMutation();
  const [, createElement] = useCreateElementMutation();

  const updateIndex = (oldOrder: Element[], newOrder: Element[]) => {
    newOrder.forEach((item, index) => {
      if (oldOrder[index] !== item) {
        editElementIndex({ elementId: item.id, index: index });
      }
    });
  };

  const onDragStart = (e: MouseEvent | TouchEvent | PointerEvent) => {
    e.preventDefault();
    oldOrder.current = items;
  };

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent) => {
    e.preventDefault();
    updateIndex(oldOrder.current, items);
  };

  const addElement = async (type: ElementType, index: number) => {

    if (type === ElementType.Database) {
      const newDatabase = await createElement({
        index,
        type,
        props: ElementDefaultProps[type],
      });
      if (newDatabase.data?.createElement) {
        const newElement = await createElement({
          index,
          type: ElementType.DatabaseView,
          props: {
            databaseId: newDatabase.data.createElement.id,
          },
          parent: props.element.id,
        });
        const newItems = [...items];
        newItems.splice(index, 0, newElement.data?.createElement as Element);
        setItems(newItems);
      }
    } else {
      const newElement = await createElement({
        index,
        type,
        props: ElementDefaultProps[type],
        parent: props.element.id,
      });
      if (newElement.data?.createElement) {
        const newItems = [...items];
        newItems.splice(index, 0, newElement.data?.createElement as Element);
        setItems(newItems);
      }
    }
  };

  const removeElement = async (id: number) => {
    const removeResult = await deleteElement({ elementId: id });
    if (removeResult.data?.removeElement) {
      const newItems = [...items];
      newItems.splice(
        items.findIndex((item) => item.id === id),
        1
      );
      setItems(newItems);
    }
  };

  const coverImg =
    elementProps.coverImg && elementProps.coverImg.length > 0
      ? elementProps.coverImg
      : undefined;

  return (
    <>
      {coverImg && (
        <Box
          backgroundImage={`linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('${elementProps.coverImg}')`}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          h={60}
          w={"100%"}
          position="sticky"
          top={0}
          zIndex={-2}
        />
      )}
      <Box>
        <Box
          px={[20, 20, 20, 28, 36, 48]}
          backgroundColor="rgba(255, 255, 255, 0.9)"
          pt={coverImg ? 10 : isMobile ? 4 : 8}
          pb={coverImg ? 5 : 4}
        >
          {elementProps.iconImg && (
            <Image
              src={elementProps.iconImg}
              alt="Page Icon"
              width={24}
              height={24}
              objectFit="cover"
              mb={4}
              mt={elementProps.coverImg ? -20 : 0}
            />
          )}
          <Flex
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
          >
            <Input
              value={elementProps.title}
              w={150}
              onChange={(e) => {
                editElement({
                  elementId: props.element.id,
                  props: { title: e.target.value },
                });
              }}
            />
            {/* <Heading size="lg" mr={4}>
              {elementProps.title}
            </Heading> */}
          </Flex>
        </Box>
        <Box
          px={[10, 10, 20, 28, 36, 48]}
          pt={coverImg ? (isMobile ? 4 : 14) : isMobile ? 4 : 8}
          pb={coverImg ? 20 : 12}
          backgroundColor="white"
        >
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={(newOrder: Element[]) => {
              setItems(newOrder);
            }}
            as="div"
          >
            {items.map((item) => {
              return (
                <Item
                  key={item.id}
                  element={item}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  addElement={addElement}
                  removeElement={removeElement}
                />
              );
            })}
            {items.length === 0 && (
              <Flex
                direction={"row"}
                borderRadius={4}
                borderWidth={1}
                borderColor="gray.300"
                mr={2}
                p={2}
              >
                <Popover>
                  <PopoverTrigger>
                    <Button size={"sm"} variant="outline">
                      +
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      {Object.keys(ElementType).map((type) => {
                        return (
                          <Button
                            key={type}
                            variant="outline"
                            onClick={() => {
                              addElement(type as ElementType, 0);
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
            )}
          </Reorder.Group>
        </Box>
      </Box>
    </>
  );
};

interface ItemProps {
  element: Element;
  onDragStart: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  addElement: (type: ElementType, index: number) => void;
  removeElement: (elementId: number) => void;
}

const Item: React.FC<ItemProps> = (props) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      key={props.element.id}
      value={props.element}
      as="div"
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      dragListener={false}
      dragControls={controls}
    >
      <Flex direction="row">
        <Flex
          direction={"row"}
          borderRadius={4}
          borderWidth={1}
          borderColor="gray.300"
          onPointerDown={(e) => controls.start(e)}
          mr={2}
          p={2}
        >
          <Popover>
            <PopoverTrigger>
              <Button size={"sm"} variant="outline">
                +
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                {Object.keys(ElementType).map((type) => {
                  return (
                    <Button
                      size={"sm"}
                      key={type}
                      variant="outline"
                      onClick={() => {
                        props.addElement(
                          type as ElementType,
                          props.element.index + 1
                        );
                      }}
                    >
                      {type}
                    </Button>
                  );
                })}
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => {
              props.removeElement(props.element.id);
            }}
          >
            -
          </Button>
        </Flex>
        <Main elementId={props.element.id} />
      </Flex>
    </Reorder.Item>
  );
};

export default Page;
