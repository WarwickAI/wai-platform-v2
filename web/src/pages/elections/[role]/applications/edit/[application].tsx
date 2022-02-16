import React from "react";
import Dashboard from "../../../../../components/Dashboard";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Form, Formik } from "formik";
import { InputField } from "../../../../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { toErrorMap } from "../../../../../utils/toErrorMap";
import {
  useEditRoleApplicationMutation,
  useGetRoleApplicationQuery,
} from "../../../../../generated/graphql";
import { setupEditValues } from "../../../../../utils/RoleApplicationInitialValues";

interface EditRoleApplicationProps {}

const EditRoleApplication: React.FC<EditRoleApplicationProps> = ({}) => {
  const router = useRouter();
  const { role, application } = router.query;
  const [{ data: applicationDetails }] = useGetRoleApplicationQuery({
    variables: { shortName: application as string },
  });
  const [, editRoleApplication] = useEditRoleApplicationMutation();

  if (applicationDetails?.getRoleApplication) {
    return (
      <Dashboard title="Edit Application">
        <Formik
          initialValues={setupEditValues(applicationDetails.getRoleApplication)}
          onSubmit={async (values, { setErrors }) => {
            const response = await editRoleApplication({
              applicationInfo: values,
              editRoleApplicationId: applicationDetails.getRoleApplication!.id,
            });
            if (!response) {
              return;
            } else if (response.data?.editRoleApplication.errors) {
              setErrors(toErrorMap(response.data.editRoleApplication.errors));
            } else {
              // Course submitted
              router.push(`/elections/${role}`);
            }
          }}
        >
          {() => (
            <Form>
              <InputField
                name="title"
                placeholder="title"
                label="Title"
                hint="Main title for the application, probably use their full name. Must be at least 3 characters."
              ></InputField>
              <Box mt={4}>
                <InputField
                  name="shortName"
                  placeholder="short name"
                  label="Short Name"
                  hint="Name used for the URL and as a unique identifier, probably the role followed by their name. Must be unique, not contain '/', 'space' or '?' and be at least 3 characters."
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
                  hint="Markdown description rendered on the application page. Type into Google 'Markdown Cheat Sheet' for help with how to style the text."
                ></InputField>
              </Box>
              <Box mt={4}>
                <InputField
                  name="img"
                  placeholder="member image"
                  label="Member Image"
                  hint="URL for the applicants image. Should be roughly square."
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
    return <Dashboard title="Loading Application" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  EditRoleApplication
);
