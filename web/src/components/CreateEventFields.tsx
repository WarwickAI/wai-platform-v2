import React, { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { InputField } from "./InputField";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import eventInitialValues from "../utils/EventInitialValues";
import { EventInput, EventResponse, TagInput } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface CreateEventFieldsProps {
  eventType: string;
  handleCreate: (
    eventInfo: EventInput
  ) => Promise<EventResponse | undefined | null>;
  handleSuccess: () => void;
}

const CreateEventFields: React.FC<CreateEventFieldsProps> = (props) => {
  const [tags, setTags] = useState<TagInput[]>([]);
  return (
    <Formik
      initialValues={eventInitialValues}
      onSubmit={async (values, { setErrors }) => {
        const response = await props.handleCreate({ ...values, tags });
        if (!response) {
          return;
        } else if (response.errors) {
          setErrors(toErrorMap(response.errors));
        } else if (response.event) {
          // Course submitted
          props.handleSuccess();
        }
      }}
    >
      {(eventFormProps) => (
        <Form>
          <InputField
            name="title"
            placeholder="title"
            label="Title"
          ></InputField>
          <Box mt={4}>
            <InputField
              name="shortName"
              placeholder="short name"
              label="Short Name"
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="display"
              label="Display"
              type="switch"
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="description"
              placeholder="description"
              label="Description"
              type="textarea"
              renderMarkdown
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="previewImg"
              placeholder="preview image"
              label="Preview Image"
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="iconImg"
              placeholder="icon image"
              label="Icon Image"
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="coverImg"
              placeholder="cover image"
              label="Cover Image"
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="redirectUrl"
              placeholder="redirect url"
              label="Redirect URL"
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="joinable"
              label="Joinable"
              type="switch"
            ></InputField>
          </Box>
          <Box mt={4}>
            <Heading size="md">Tags</Heading>
            <Formik
              initialValues={{ title: "", color: "" }}
              onSubmit={async (values, { setErrors }) => {
                if (
                  tags.findIndex((tag) => tag.title === values.title) === -1
                ) {
                  setTags([
                    ...tags,
                    { title: values.title, color: values.color },
                  ]);
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
            <Flex mt={4}>
              {tags.map((tag) => (
                <Badge key={tag.title} color={tag.color}>
                  {tag.title}
                  <Text
                    onClick={() => {
                      const tmpTags = tags;
                      tmpTags.splice(
                        tags.findIndex((searchTag) => {
                          return searchTag.title === tag.title;
                        }, 1)
                      );
                      setTags([...tmpTags]);
                    }}
                  >
                    x
                  </Text>
                </Badge>
              ))}
            </Flex>
          </Box>
          <Box mt={4}>
            <Button
              type="submit"
              variant="primary"
              // disabled={!isSubmitting}
            >
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEventFields;
