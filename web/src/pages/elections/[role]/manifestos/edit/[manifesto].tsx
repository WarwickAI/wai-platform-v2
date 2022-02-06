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
  useEditRoleManifestoMutation,
  useGetRoleManifestoQuery,
} from "../../../../../generated/graphql";
import { setupEditValues } from "../../../../../utils/RoleManifestoInitialValues";

interface EditRoleManifestoProps {}

const EditRoleManifesto: React.FC<EditRoleManifestoProps> = ({}) => {
  const router = useRouter();
  const { role, manifesto } = router.query;
  const [{ data: manifestoDetails }] = useGetRoleManifestoQuery({
    variables: { shortName: manifesto as string },
  });
  const [, editRoleManifesto] = useEditRoleManifestoMutation();

  if (manifestoDetails?.getRoleManifesto) {
    return (
      <Dashboard title="Edit Manifesto">
        <Formik
          initialValues={setupEditValues(manifestoDetails.getRoleManifesto)}
          onSubmit={async (values, { setErrors }) => {
            const response = await editRoleManifesto({
              manifestoInfo: values,
              editRoleManifestoId: manifestoDetails.getRoleManifesto!.id,
            });
            if (!response) {
              return;
            } else if (response.data?.editRoleManifesto.errors) {
              setErrors(toErrorMap(response.data.editRoleManifesto.errors));
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
                  name="img"
                  placeholder="member image"
                  label="Member Image"
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
  } else {
    return <Dashboard title="Loading Manifesto" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  EditRoleManifesto
);
