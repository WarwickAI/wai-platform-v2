import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import {
  useCreateElementMutation,
  useEditElementDataMutation,
  useEditElementIndexMutation,
  useInheritDatabaseAttributesMutation,
  useMeQuery,
  User,
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
import { checkPermissions } from "../../utils/isAuth";
import ElementPage from "../Utils/ElementPage";

interface PageProps {
  element: Element<PageElementData>;
  isEdit: boolean;
  isFullPage: boolean;
}

const Page: React.FC<PageProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.data as PageElementData;

  const [emptyPageAddElementPopoverOpen, setEmptyPageAddElementPopoverOpen] =
    useState<boolean>(false);

  const [{ data: meData }, meQuery] = useMeQuery();

  const [items, setItems] = useState<Element<any>[]>([]);
  const [oldItems, setOldItems] = useState<Element<any>[]>([]);
  const { isEdit } = useContext(EditContext);

  const isTemplate = useMemo(() => {
    return props.element.type === "Template";
  }, [props.element.type]);

  // Initialise and update page content here
  useEffect(() => {
    const contentSorted = (props.element.children as Element<any>[]).sort(
      (a, b) => a.index! - b.index!
    );
    // Filter out non-visible elements
    const contentFiltered = contentSorted.filter((item) =>
      checkPermissions(item.canViewGroups, meData?.me as User | undefined)
    );

    setItems(contentFiltered);
    setOldItems(contentFiltered);
  }, [props.element.children, meData?.me]);

  const [, createElement] = useCreateElementMutation();
  const [, editElement] = useEditElementDataMutation();
  const [, editElementIndex] = useEditElementIndexMutation();
  const [, deleteElement] = useRemoveElementMutation();
  const [, inheritDatabaseAttributes] = useInheritDatabaseAttributesMutation();

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
                isEdit={isEdit}
              />
            );
          })}
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
        </Reorder.Group>
      </ElementPage>
    );
  }
};

export default Page;
