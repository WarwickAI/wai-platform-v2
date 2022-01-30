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
            hint="Main title for the event. Must be at least 3 characters."
          ></InputField>
          <Box mt={4}>
            <InputField
              name="shortName"
              placeholder="short name"
              label="Short Name"
              hint="Name used for the URL and as a unique identifier. Must be unique, not contain '/', 'space' or '?' and be at least 3 characters."
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="display"
              label="Display"
              type="switch"
              hint="Whether to display to normal users or hide."
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="description"
              placeholder="description"
              label="Description"
              type="textarea"
              renderMarkdown
              hint="Markdown description rendered on the event page. Type into Google 'Markdown Cheat Sheet' for help with how to style the text."
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="previewImg"
              placeholder="preview image"
              label="Preview Image"
              hint="URL for the image used for the card (on the page showing all events). Should be roughly portrait."
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="iconImg"
              placeholder="icon image"
              label="Icon Image"
              hint="URL for the image used as the event icon/logo. Should be square."
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="coverImg"
              placeholder="cover image"
              label="Cover Image"
              hint="URL for the image used as the event banner at the top of the event's page. Should be roughly landscape."
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="redirectUrl"
              placeholder="redirect url"
              label="Redirect URL"
              hint="Enter a URL here for normal users to be redirected to when they click on the event, instead of seeing the event page on this website."
            ></InputField>
          </Box>
          <Box mt={4}>
            <InputField
              name="joinable"
              label="Joinable"
              type="switch"
              hint="Whether the event should be joinable by users."
            ></InputField>
          </Box>
          <Box mt={4}>
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
