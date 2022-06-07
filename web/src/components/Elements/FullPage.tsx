import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
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
import {
  ElementDefaultProps,
  ElementTyper,
  PageElementProps,
  PropertyTypes,
} from "../../utils/elements";
import PageItem from "./PageItem";

interface PageProps {
  element: ElementTyper<PageElementProps>;
  refetchElement: () => void;
}

const Page: React.FC<PageProps> = (props) => {
  const elementProps = props.element.props as PageElementProps;
  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });

  const [items, setItems] = useState<Element[]>([]);
  const [oldItems, setOldItems] = useState<Element[]>([]);

  // Initialise and update page content here
  useEffect(() => {
    const contentSorted = props.element.content.sort(
      (a, b) => a.index! - b.index!
    );
    setItems(contentSorted);
    setOldItems(contentSorted);
  }, [props.element.content]);

  // Modifiable props
  const [pageTitle, setPageTitle] = useState<string>(elementProps.title.value);

  const [, createElement] = useCreateElementMutation();
  const [, editElement] = useEditElementPropsMutation();
  const [, editElementIndex] = useEditElementIndexMutation();
  const [, deleteElement] = useRemoveElementMutation();

  const updateIndex = (oldOrder: Element[], newOrder: Element[]) => {
    newOrder.forEach((item, index) => {
      if (oldOrder[index] !== item) {
        editElementIndex({ elementId: item.id, index: index });
      }
    });
  };

  const onDragStart = (e: MouseEvent | TouchEvent | PointerEvent) => {
    e.preventDefault();
    setOldItems(items);
  };

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent) => {
    e.preventDefault();
    updateIndex(oldItems, items);
  };

  const addElement = async (type: ElementType, index: number) => {
    if (type === ElementType.Database) {
      const newDatabase = await createElement({
        index,
        type,
        props: ElementDefaultProps[type],
      });
      if (newDatabase.data?.createElement) {
        await createElement({
          index,
          type: ElementType.DatabaseView,
          props: {
            databaseId: {
              type: PropertyTypes.Number,
              value: newDatabase.data.createElement.id,
            },
          },
          parent: props.element.id,
        });
      }
    } else {
      await createElement({
        index,
        type,
        props: ElementDefaultProps[type],
        parent: props.element.id,
      });
    }
    props.refetchElement();
  };

  const removeElement = async (id: number) => {
    const res = await deleteElement({ elementId: id });
    if (res.data?.removeElement) {
      const tmpItems = items.filter((item) => item.id !== id);
      props.refetchElement();
    }
  };

  const coverImg = useMemo(
    () =>
      elementProps.coverImg.value ? elementProps.coverImg.value : undefined,
    [elementProps.coverImg.value]
  );

  return (
    <>
      {coverImg && (
        <Box
          backgroundImage={`linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('${elementProps.coverImg.value}')`}
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
          {elementProps.iconImg.value && (
            <Image
              src={elementProps.iconImg.value}
              alt="Page Icon"
              width={24}
              height={24}
              objectFit="cover"
              mb={4}
              mt={elementProps.coverImg.value ? -20 : 0}
            />
          )}
          <Flex
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
          >
            <Input
              value={pageTitle}
              w={150}
              onChange={(e) => {
                setPageTitle(e.target.value);
                editElement({
                  elementId: props.element.id,
                  props: {
                    title: { type: PropertyTypes.Text, value: e.target.value },
                  },
                });
                props.refetchElement();
              }}
            />
          </Flex>
        </Box>
        <Box
          px={[10, 10, 20, 28, 36, 48]}
          pt={coverImg ? (isMobile ? 4 : 14) : isMobile ? 4 : 8}
          pb={coverImg ? 20 : 12}
          backgroundColor="white"
        >
          <Reorder.Group axis="y" values={items} onReorder={setItems} as="div">
            {items.map((item) => {
              return (
                <PageItem
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

export default Page;
