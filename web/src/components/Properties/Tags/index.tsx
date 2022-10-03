import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Flex,
  HStack,
  Input,
  Text,
  Select as ChakraSelect,
  AlertDialogFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { GroupBase, Select } from "chakra-react-select";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Tag,
  useCreateTagMutation,
  useGetTagsQuery,
} from "../../../generated/graphql";
import { TagTypes, TagTypesKeys } from "../../../utils/config";

interface TagsPropertyProps {
  value: string[];
  onChange: (v: string[]) => void;
  isEdit: boolean;
}

const TagsProperty: React.FC<TagsPropertyProps> = (props) => {
  const [{ data: allTagsQuery }] = useGetTagsQuery();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const allTags = useMemo(() => {
    if (!allTagsQuery) {
      return [];
    }
    return allTagsQuery.getTags as Tag[];
  }, [allTagsQuery]);

  useEffect(() => {
    if (!props.value) {
      return;
    }
    const selectedTags = allTags.filter((tag) => props.value.includes(tag.id));
    setSelectedTags(selectedTags);
  }, [props.value, allTags]);

  if (!props.isEdit) {
    return (
      <Flex flexWrap="wrap">
        {selectedTags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </Flex>
    );
  } else {
    return (
      <HStack>
        <Select<
          { label: string; value: Tag },
          true,
          GroupBase<{ label: string; value: Tag }>
        >
          isMulti
          options={[
            {
              label: "Tags",
              options: allTags.map((tag) => {
                return {
                  label: tag.name,
                  value: tag as Tag,
                };
              }),
            },
          ]}
          value={selectedTags.map((tag) => {
            return { label: tag.name, value: tag as Tag };
          })}
          onChange={(e) => {
            setSelectedTags(e.map((group) => group.value));
            props.onChange(e.map((v) => v.value.id));
          }}
          chakraStyles={{
            container: (provided, state) => {
              return { w: "full", pos: "relative" };
            },
          }}
          placeholder="Tags"
        />
        <Button size={"sm"} variant="primary" onClick={onAddOpen}>
          +
        </Button>
        <AddTagPopup
          isOpen={isAddOpen}
          onOpen={onAddOpen}
          onClose={onAddClose}
          onAddTag={(tag) => {
            console.log(tag);
            setSelectedTags([...selectedTags, tag]);
            props.onChange([...props.value, tag.id]);
          }}
        />
      </HStack>
    );
  }
};

interface TagCardProps {
  tag: Tag;
}

export const TagCard: React.FC<TagCardProps> = (props) => {
  return (
    <Badge
      bg={props.tag.color}
      textColor="white"
      borderRadius={"lg"}
      mr={2}
      mb={2}
    >
      <Tooltip label={props.tag.description} hasArrow>
        {props.tag.name}
      </Tooltip>
    </Badge>
  );
};

interface AddTagPopupProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAddTag: (v: Tag) => void;
}

const AddTagPopup: React.FC<AddTagPopupProps> = (props) => {
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();

  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#000000");
  const [tagType, setTagType] = useState<TagTypesKeys>("General");
  const [tagDescription, setTagDescription] = useState("");

  const [, createTag] = useCreateTagMutation();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      // @ts-ignore
      leastDestructiveRef={cancelAddRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Create New Tag -{" "}
            <TagCard
              tag={{
                id: "9999",
                name: tagName,
                description: tagDescription,
                color: tagColor,
                type: tagType,
                createdAt: "1",
                updatedAt: "1",
              }}
            ></TagCard>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Name:
              </Text>
              <Input
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
                value={tagName}
              />
            </Flex>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Description:
              </Text>
              <Input
                onChange={(e) => {
                  setTagDescription(e.target.value);
                }}
                value={tagDescription}
              />
            </Flex>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Color:
              </Text>
              <input
                type="color"
                onChange={(e) => {
                  setTagColor(e.target.value);
                }}
                value={tagColor}
              />
            </Flex>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Base Type:
              </Text>
              <ChakraSelect
                onChange={(e) => {
                  setTagType(e.target.value as TagTypesKeys);
                }}
                value={tagType}
              >
                {Object.keys(TagTypes).map((typeName) => {
                  const tagType = TagTypes[typeName as TagTypesKeys];
                  return (
                    <option key={typeName} value={typeName}>
                      {tagType.name}
                    </option>
                  );
                })}
              </ChakraSelect>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelAddRef}
              colorScheme="red"
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              ml={3}
              onClick={async () => {
                // Create new tag
                const newTag = await createTag({
                  name: tagName,
                  type: tagType,
                  color: tagColor,
                  description: tagDescription,
                });
                if (newTag.data?.createTag) {
                  props.onAddTag(newTag.data?.createTag);
                  // Reset fields
                  setTagName("");
                  setTagColor("");
                  setTagType("General");
                  setTagDescription("");

                  props.onClose();
                }
              }}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default TagsProperty;
