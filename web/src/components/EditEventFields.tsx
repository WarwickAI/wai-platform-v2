import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "./InputField";
import { Box, Button } from "@chakra-ui/react";
import { setupEditValues } from "../utils/EventInitialValues";
import {
  EventInput,
  EventResponse,
  RegularEventFragment,
  RegularCourseFragment,
  RegularProjectFragment,
  RegularTalkFragment,
  RegularTutorialFragment,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface EditEventFieldsProps {
  eventType: string;
  eventDetails:
    | RegularEventFragment
    | RegularCourseFragment
    | RegularProjectFragment
    | RegularTalkFragment
    | RegularTutorialFragment;
  handleEdit: (
    eventInfo: EventInput
  ) => Promise<EventResponse | undefined | null>;
  handleSuccess: () => void;
}

const EditEventFields: React.FC<EditEventFieldsProps> = (props) => {
  const initialValues = setupEditValues(props.eventDetails);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const response = await props.handleEdit(values);
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
      {() => (
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

export default EditEventFields;
