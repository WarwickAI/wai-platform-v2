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
import {
  EventInput,
  CourseResponse,
  ProjectResponse,
  TalkResponse,
  TutorialResponse,
  TagInput,
  RegularTagFragment,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import TagField from "./TagField";

interface CreateEventFieldsProps {
  eventType: string;
  handleCreate: (
    eventInfo: EventInput
  ) => Promise<
    | CourseResponse
    | ProjectResponse
    | TalkResponse
    | TutorialResponse
    | undefined
    | null
  >;
  handleSuccess: () => void;
}

const CreateEventFields: React.FC<CreateEventFieldsProps> = (props) => {
  const [tags, setTags] = useState<RegularTagFragment[]>([]);
  return (
    <Formik
      initialValues={eventInitialValues}
      onSubmit={async (values, { setErrors }) => {
        console.log(tags);
        const response = await props.handleCreate({
          ...values,
          tags: tags.map((tag) => tag.id),
        });
        if (!response) {
          return;
        } else if (response.errors) {
          setErrors(toErrorMap(response.errors));
        } else {
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
            <TagField
              tagsSelected={tags}
              handleAddTag={(tagToAdd) => {
                if (tags.findIndex((tag) => tagToAdd.id === tag.id) === -1) {
                  setTags([...tags, tagToAdd]);
                }
              }}
              handleRemoveTag={(tagToRemove) => {
                if (tags.findIndex((tag) => tagToRemove.id === tag.id) !== -1) {
                  const tmpTags = tags;
                  tmpTags.splice(
                    tags.findIndex((tag) => tagToRemove.id === tag.id),
                    1
                  );
                  setTags([...tmpTags]);
                }
              }}
            />
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
