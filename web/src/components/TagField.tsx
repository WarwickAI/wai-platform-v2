import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Select,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Tooltip,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  RegularTagFragment,
  useCreateTagMutation,
  useTagsQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";
import infoOutline from "@iconify/icons-eva/info-outline";
import { getIcon } from "./SidebarConfig";

interface TagFieldProps {
  tagsSelected: RegularTagFragment[];
  handleAddTag: (newTag: RegularTagFragment) => void;
  handleRemoveTag: (newTag: RegularTagFragment) => void;
}

const TagField: React.FC<TagFieldProps> = (props) => {
  const [{ data: tags }, fetchTags] = useTagsQuery();
  const [, createTag] = useCreateTagMutation();

  return (
    <>
      <Flex>
        <Heading size="md" mr={4}>Tags</Heading>
        <Tooltip label={"Add or create new tags for the event. Use an exisiting tag if possible since you are not allowed duplicate tag names and will ensure consistency."}>{getIcon(infoOutline)}</Tooltip>
      </Flex>
      <Formik
        initialValues={{ title: "", color: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (
            tags &&
            tags?.tags.findIndex((tag) => tag.title === values.title) !== -1
          ) {
            // Tag already exists
            const { id: tagId, title: tagTitle, color: tagColor } = tags.tags[
              tags.tags.findIndex((tag) => tag.title === values.title)
            ];
            props.handleAddTag({ id: tagId, title: tagTitle, color: tagColor });
          } else {
            // Create tag
            const response = await createTag({
              tagInfo: { title: values.title, color: values.color },
            });
            if (response.data?.createTag.tag) {
              props.handleAddTag(response.data.createTag.tag);
              fetchTags();
            } else if (response.data?.createTag.errors) {
              setErrors(toErrorMap(response.data.createTag.errors));
            }
          }
        }}
      >
        {(tagFormProps) => (
          <Form>
            <HStack mt={4}>
              <InputField
                name="title"
                placeholder="tag title"
                label="Tag Title"
                hint="Name for the tag. This must be unique (i.e. no existing tag with the same name) and at least 3 characters"
              />
              <InputField
                name="color"
                placeholder="tag color"
                label="Tag Color"
                hint="Color of the tag. This should be in the format of '#rrggbb' where rr, gg, bb are hexadecimal values for red green and blue. Search for RGB colour picker for help finding out this value."
              />
              <Button variant="primary" onClick={tagFormProps.submitForm}>
                +
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
      <Popover placement="top">
        <PopoverTrigger>
          <Button mt={4} variant="primary">
            Add Existing Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Select an Existing Tag</PopoverHeader>
          <PopoverBody>
            <Flex>
              {tags?.tags.map((tag) => (
                <Badge
                  key={tag.title}
                  onClick={() => props.handleAddTag(tag)}
                  backgroundColor={tag.color}
                  mr={2}
                  borderRadius="lg"
                >
                  {tag.title}
                </Badge>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex mt={4}>
        {props.tagsSelected.map((tag) => (
          <Badge
            key={tag.title}
            backgroundColor={tag.color}
            onClick={() => {
              props.handleRemoveTag(tag);
            }}
            mx={2}
            borderRadius="lg"
          >
            {tag.title}
          </Badge>
        ))}
      </Flex>
    </>
  );
};

export default TagField;
