import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Select,
  Text,
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
      <Select placeholder="Select tag to add" mt={4}>
        {tags?.tags.map((tag) => (
          <option
            key={tag.title}
            value={tag.title}
            onClick={() => props.handleAddTag(tag)}
          >
            {tag.title}
          </option>
        ))}
      </Select>
      <Flex mt={4}>
        {props.tagsSelected.map((tag) => (
          <Badge
            key={tag.title}
            backgroundColor={tag.color}
            onClick={() => {
              props.handleRemoveTag(tag);
            }}
          >
            {tag.title}
            <Text>x</Text>
          </Badge>
        ))}
      </Flex>
    </>
  );
};

export default TagField;
