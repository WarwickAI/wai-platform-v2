import React, { useEffect, useMemo, useState } from "react";
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
  Element,
  ElementType,
  useCreateElementMutation,
  useEditElementIndexMutation,
  useEditElementPropsMutation,
  useRemoveElementMutation,
} from "../../generated/graphql";
import { Reorder } from "framer-motion";
import {
  createDefaultElementProps,
  ElementTyper,
  PageElementProps,
  PropertyTypes,
} from "../../utils/elements";
import PageItem from "../Utils/PageItem";
import AddElementPopover from "../Utils/AddElementPopover";
import ElementSettingsPopover from "../Utils/ElementSettingsPopover";
import { useRouter } from "next/router";

interface PageProps {
  element: ElementTyper<PageElementProps>;
  isEdit: boolean;
  isFullPage: boolean;
}

const Page: React.FC<PageProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as PageElementProps;

  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });

  const [items, setItems] = useState<Element[]>([]);
  const [oldItems, setOldItems] = useState<Element[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [refreshDatabaseId, setRefreshDatabaseId] = useState<
    number | undefined
  >(undefined);

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
    await createElement({
      index,
      type,
      props: createDefaultElementProps(type),
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

  const refreshDatabase = (id: number | undefined) => {
    setRefreshDatabaseId(id);
  };

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
              {isEditMode ? (
                <>
                  <Input
                    value={pageTitle}
                    w={300}
                    size="lg"
                    fontSize={24}
                    fontWeight={600}
                    onChange={(e) => {
                      setPageTitle(e.target.value);
                      editElement({
                        elementId: props.element.id,
                        props: {
                          title: {
                            type: PropertyTypes.Text,
                            value: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                  <ElementSettingsPopover
                    onOpen={() => {}}
                    onClose={() => {}}
                    element={props.element}
                    removeElement={() => {}}
                    disabled={false}
                  />
                </>
              ) : (
                <Flex alignItems={"center"} h={12} w={300}>
                  <Heading
                    mx={4}
                    fontSize={24}
                    fontWeight={600}
                    borderWidth={1}
                    borderColor="white"
                  >
                    {pageTitle}
                  </Heading>
                </Flex>
              )}
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="edit-mode" mb="0">
                  Edit Mode?
                </FormLabel>
                <Switch
                  id="edit-mode"
                  isChecked={isEditMode}
                  onChange={(e) => setIsEditMode(e.target.checked)}
                />
              </FormControl>
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
                    isEdit={isEditMode}
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