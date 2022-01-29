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
              />
              <InputField
                name="color"
                placeholder="tag color"
                label="Tag Color"
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
                  mx={2}
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
