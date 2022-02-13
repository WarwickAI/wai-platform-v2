import React from "react";
import Dashboard from "../../../components/Dashboard";
import {
  useCreateElectionRoleMutation,
  useEditElectionRoleMutation,
  useGetElectionRoleQuery,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import electionRoleInitialValues, {
  setupEditValues,
} from "../../../utils/ElectionRoleInitialValues";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { toErrorMap } from "../../../utils/toErrorMap";

interface EditElectionRoleProps {}

const EditElectionRole: React.FC<EditElectionRoleProps> = ({}) => {
  const router = useRouter();
  const { role } = router.query;
  const [{ data: roleDetails }] = useGetElectionRoleQuery({
    variables: { shortName: role as string },
  });
  const [, editElectionRole] = useEditElectionRoleMutation();

  if (roleDetails?.getElectionRole) {
    return (
      <Dashboard title="Edit Election Role">
        <Formik
          initialValues={setupEditValues(roleDetails.getElectionRole)}
          onSubmit={async (values, { setErrors }) => {
            const response = await editElectionRole({
              roleInfo: values,
              editElectionRoleId: roleDetails.getElectionRole!.id,
            });
            if (!response) {
              return;
            } else if (response.data?.editElectionRole.errors) {
              setErrors(toErrorMap(response.data.editElectionRole.errors));
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
                hint="Main title for the role. Must be at least 3 characters."
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
                  hint="Markdown description rendered at the top of the role's page. Type into Google 'Markdown Cheat Sheet' for help with how to style the text."
                ></InputField>
              </Box>
              <Box mt={4}>
                <InputField
                  name="manifestoTemplate"
                  placeholder="manifesto template"
                  label="Manifesto Template"
                  type="textarea"
                  renderMarkdown
                  hint="Markdown manifesto description template given to applicants. Type into Google 'Markdown Cheat Sheet' for help with how to style the text."
                ></InputField>
              </Box>
              <Box mt={4}>
                <InputField
                  name="previewImg"
                  placeholder="preview image"
                  label="Preview Image"
                  hint="URL for the image used for the card (on the page showing all roles). Should be roughly portrait."
                ></InputField>
              </Box>
              <Box mt={4}>
                <InputField
                  name="canSubmitManifesto"
                  label="Can Apply"
                  type="switch"
                  hint="Whether members can apply for this role."
                ></InputField>
              </Box>
              <Box mt={4}>
                <InputField
                  name="submitManifestoUrl"
                  placeholder="apply redirect url"
                  label="Apply Redirect URL"
                  hint="URL to redirect users to to apply for this role."
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
  } else {
    return <Dashboard title="Loading Election Role" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  EditElectionRole
);
