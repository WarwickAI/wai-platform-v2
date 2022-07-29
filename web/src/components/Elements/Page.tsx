import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Switch,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  useCreateElementMutation,
  useEditElementDataMutation,
  useEditElementIndexMutation,
  useMeQuery,
  useRemoveElementMutation,
} from "../../generated/graphql";
import { Reorder } from "framer-motion";
import PageItem from "../Utils/PageItem";
import AddElementPopover from "../Utils/AddElementPopover";
import ElementSettingsPopover from "../Utils/ElementSettingsPopover";
import { useRouter } from "next/router";
import {
  createDefaultElementData,
  Element,
  ElementTypeKeys,
} from "../../utils/config";
import { PageElementData } from "../../utils/base_element_types";
import { EditContext } from "../../utils/EditContext";
import TextProperty from "../Properties/Text";

interface PageProps {
  element: Element<PageElementData>;
  isEdit: boolean;
  isFullPage: boolean;
}

const Page: React.FC<PageProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.data as PageElementData;

  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });

  const [items, setItems] = useState<Element<any>[]>([]);
  const [oldItems, setOldItems] = useState<Element<any>[]>([]);
  const { isEdit } = useContext(EditContext);

  // Initialise and update page content here
  useEffect(() => {
    const contentSorted = (props.element.children as Element<any>[]).sort(
      (a, b) => a.index! - b.index!
    );
    setItems(contentSorted);
    setOldItems(contentSorted);
  }, [props.element.children]);

  // Modifiable props
  const [pageTitle, setPageTitle] = useState<string>(elementProps.title.value);

  const [, createElement] = useCreateElementMutation();
  const [, editElement] = useEditElementDataMutation();
  const [, editElementIndex] = useEditElementIndexMutation();
  const [, deleteElement] = useRemoveElementMutation();

  const updateIndex = (oldOrder: Element<any>[], newOrder: Element<any>[]) => {
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

  const addElement = async (type: ElementTypeKeys, index: number) => {
    await createElement({
      index,
      type,
      data: createDefaultElementData(type),
      parent: props.element.id,
    });
  };

  const removeElement = async (id: number) => {
    await deleteElement({ elementId: id });
  };

  const coverImg = useMemo(
    () =>
      elementProps.coverImg.value ? elementProps.coverImg.value : undefined,
    [elementProps.coverImg.value]
  );

  if (!props.isFullPage) {
    return (
      <Button
        colorScheme={"blue"}
        onClick={() => {
          router.push(`/generic/${props.element.id}`);
        }}
      >
        {elementProps.title.value}
      </Button>
    );
  } else {
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
              position={"relative"}
            >
              <Box position="relative" px={2} my={2}>
                {/* Element Controls */}
                <Flex
                  height={"full"}
                  position="absolute"
                  left="-5"
                  alignItems={"center"}
                  opacity={0.2}
                  _hover={{
                    opacity: 1,
                  }}
                >
                  {props.isEdit && (
                    <ElementSettingsPopover
                      onOpen={() => {}}
                      onClose={() => {}}
                      element={props.element}
                      removeElement={() => {}}
                      disabled={false}
                    />
                  )}
                </Flex>

                <TextProperty
                  value={pageTitle}
                  onChange={(v) => setPageTitle(v)}
                  isEdit={isEdit}
                  isTitle={true}
                />
              </Box>
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
              onReorder={setItems}
              as="div"
            >
              {items.map((item) => {
                return (
                  <PageItem
                    key={item.id}
                    element={item}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    addElement={addElement}
                    removeElement={removeElement}
                    isEdit={isEdit}
                  />
                );
              })}
              {items.length === 0 && (
                <Box position="relative" p={2} my={2}>
                  <Flex
                    position={"absolute"}
                    justifyContent={"center"}
                    width={"full"}
                    zIndex={1}
                  >
                    <AddElementPopover
                      onOpen={() => {}}
                      onClose={() => {}}
                      addElement={addElement}
                      atIndex={0}
                    />
                  </Flex>
                </Box>
              )}
            </Reorder.Group>
          </Box>
        </Box>
      </>
    );
  }
};

export default Page;
