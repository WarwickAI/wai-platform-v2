import React from "react";
import Dashboard from "../../components/Dashboard";
import {
  useCreateElectionRoleMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import electionRoleInitialValues from "../../utils/ElectionRoleInitialValues";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { toErrorMap } from "../../utils/toErrorMap";

interface CreateElectionRoleProps {}

const CreateElectionRole: React.FC<CreateElectionRoleProps> = ({}) => {
  const router = useRouter();
  const [, createElectionRole] = useCreateElectionRoleMutation();

  return (
    <Dashboard title="Create Election Role">
      <Formik
        initialValues={electionRoleInitialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await createElectionRole({ roleInfo: values });
          if (!response) {
            return;
          } else if (response.data?.createElectionRole.errors) {
            setErrors(toErrorMap(response.data.createElectionRole.errors));
          } else {
            // Course submitted
            router.push("/elections");
          }
        }}
      >
        {() => (
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
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  CreateElectionRole
);
