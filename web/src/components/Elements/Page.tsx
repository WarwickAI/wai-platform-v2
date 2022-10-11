import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import {
  useCreateElementMutation,
  useEditElementDataMutation,
  useEditElementIndicesMutation,
  useGetTagsQuery,
  useInheritDatabaseAttributesMutation,
  useMeQuery,
  User,
  useRemoveElementMutation,
} from "../../generated/graphql";
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
import { checkPermissions } from "../../utils/isAuth";
import ElementPage from "../Utils/ElementPage";

interface PageProps {
  element: Element<PageElementData>;
  isEdit: boolean;
  isFullPage: boolean;
}

const Page: React.FC<PageProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.data;

  const [{ data: allTagsQuery }] = useGetTagsQuery();

  const allTags = allTagsQuery?.getTags;

  const [emptyPageAddElementPopoverOpen, setEmptyPageAddElementPopoverOpen] =
    useState<boolean>(false);

  const [{ data: meData }, meQuery] = useMeQuery();

  const [items, setItems] = useState<Element<any>[]>([]);
  const { isEdit } = useContext(EditContext);

  const isTemplate = useMemo(() => {
    return props.element.type === "Template";
  }, [props.element.type]);

  const selectedTags = useMemo(() => {
    return (
      elementProps.tags?.value &&
      allTags?.filter((tag) => elementProps.tags.value.includes(tag.id))
    );
  }, [elementProps.tags, allTags]);

  // Initialise and update page content here
  useEffect(() => {
    if (!props.isFullPage) {
      return;
    }

    const contentSorted = (props.element.children as Element<any>[]).sort(
      (a, b) => a.index! - b.index!
    );
    // Filter out non-visible elements
    const contentFiltered = contentSorted.filter((item) =>
      checkPermissions(item.canViewGroups, meData?.me as User | undefined)
    );

    // Set index correctly for all elements
    contentFiltered.forEach((item, index) => {
      item.index = index;
    });

    setItems(contentFiltered);
  }, [props.element.children, meData?.me, props.isFullPage]);

  const [, createElement] = useCreateElementMutation();
  const [, editElement] = useEditElementDataMutation();
  const [, editElementIndices] = useEditElementIndicesMutation();
  const [, deleteElement] = useRemoveElementMutation();
  const [, inheritDatabaseAttributes] = useInheritDatabaseAttributesMutation();

  const addElement = useCallback(
    async (type: ElementTypeKeys, index: number) => {
      await createElement({
        index,
        type,
        data: createDefaultElementData(type),
        parent: props.element.id,
      });
    },
    [props.element.id, createElement]
  );

  const removeElement = useCallback(
    async (id: number) => {
      await deleteElement({ elementId: id });
    },
    [deleteElement]
  );

  const coverImg = useMemo(
    () =>
      elementProps.coverImg.value
        ? `https://${process.env.NEXT_PUBLIC_CDN}/${elementProps.coverImg.value}`
        : undefined,
    [elementProps.coverImg.value]
  );

  const iconImg = useMemo(
    () =>
      elementProps.iconImg.value
        ? `https://${process.env.NEXT_PUBLIC_CDN}/${elementProps.iconImg.value}`
        : undefined,
    [elementProps.iconImg.value]
  );

  const moveCard = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      let tmpItems = [...items];

      tmpItems.splice(dragIndex, 1);
      tmpItems.splice(hoverIndex, 0, items[dragIndex]);

      // Update item index
      tmpItems.forEach((item, index) => {
        item.index = index;
      });
      setItems(tmpItems);

      editElementIndices({
        elementId: props.element.id,
        newOrder: tmpItems.map((item) => item.id),
      });
    },
    [items, editElementIndices, props.element.id]
  );

  const renderCard = useCallback(
    (item: Element<any>, index: number) => {
      return (
        <PageItem
          key={item.id}
          element={item}
          addElement={addElement}
          removeElement={removeElement}
          isEdit={isEdit}
          moveCard={moveCard}
          index={index}
        />
      );
    },
    [addElement, removeElement, isEdit, moveCard]
  );

  if (!props.isFullPage) {
    return (
      <Button
        colorScheme={"blue"}
        onClick={() => {
          if (props.element.route) {
            router.push(props.element.route);
          } else {
            router.push(`/generic/${props.element.id}`);
          }
        }}
      >
        {elementProps.title.value}
      </Button>
    );
  } else {
    return (
      <ElementPage
        title={elementProps.title.value}
        coverImg={coverImg}
        iconImg={iconImg}
        isEdit={isEdit}
        editTitle={(v) =>
          editElement({
            elementId: props.element.id,
            data: { title: { type: "Text", value: v } },
          })
        }
        tags={selectedTags}
        settingsPopover={
          <ElementSettingsPopover
            onOpen={() => {}}
            onClose={() => {}}
            element={props.element}
            removeElement={() => {}}
            disabled={false}
            extraAttributes={
              isTemplate
                ? [
                    {
                      key: "Inherit_Database_Atts",
                      label: "Inherit Database Atts",
                      value: -1,
                      type: "Database",
                      editValue: (value) =>
                        inheritDatabaseAttributes({
                          databaseId: parseInt(value),
                          elementId: props.element.id,
                        }),
                    },
                  ]
                : []
            }
          />
        }
      >
        <div>
          {items.map((item, index) => renderCard(item, index))}

          {items.length === 0 && isEdit && (
            <Box position="relative" p={2} my={2}>
              <Flex
                position={"absolute"}
                justifyContent={"center"}
                width={"full"}
                zIndex={1}
              >
                <AddElementPopover
                  isOpen={emptyPageAddElementPopoverOpen}
                  setOpen={(v) => setEmptyPageAddElementPopoverOpen(v)}
                  onOpen={() => {}}
                  onClose={() => {}}
                  addElement={addElement}
                  atIndex={0}
                />
              </Flex>
            </Box>
          )}
        </div>
      </ElementPage>
    );
  }
};

export default Page;
