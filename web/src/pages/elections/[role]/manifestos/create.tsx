import React from "react";
import Dashboard from "../../../../components/Dashboard";
import {
  useCreateElectionRoleMutation,
  useCreateRoleManifestoMutation,
  useGetElectionRoleQuery,
} from "../../../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import roleManifestoInitialValues from "../../../../utils/RoleManifestoInitialValues";
import { Form, Formik } from "formik";
import { InputField } from "../../../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { toErrorMap } from "../../../../utils/toErrorMap";

interface CreateRoleManifestoProps {}

const CreateRoleManifesto: React.FC<CreateRoleManifestoProps> = ({}) => {
  const router = useRouter();
  const { role } = router.query;
  const [{ data: roleInfo }] = useGetElectionRoleQuery({
    variables: { shortName: role as string },
  });
  const [, createRoleManifesto] = useCreateRoleManifestoMutation();

  return (
    <Dashboard title="Create Election Role">
      <Formik
        initialValues={{
          ...roleManifestoInitialValues,
          description: roleInfo?.getElectionRole?.manifestoTemplate
            ? roleInfo.getElectionRole.manifestoTemplate
            : "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createRoleManifesto({
            manifestoInfo: values,
            roleShortName: role as string,
          });
          if (!response) {
            return;
          } else if (response.data?.createRoleManifesto.errors) {
            setErrors(toErrorMap(response.data.createRoleManifesto.errors));
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
              hint="Main title for the manifesto, probably use their full name. Must be at least 3 characters."
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
                hint="Markdown description rendered on the manifesto page. Type into Google 'Markdown Cheat Sheet' for help with how to style the text."
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
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  CreateRoleManifesto
);
