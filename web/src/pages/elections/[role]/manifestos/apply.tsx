import React from "react";
import Dashboard from "../../../../components/Dashboard";
import {
  useGetElectionRoleQuery,
  useMeQuery,
  useRoleApplyMutation,
} from "../../../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import roleApplyInitialValues from "../../../../utils/RoleApplyInitialValues";
import { Form, Formik } from "formik";
import { InputField } from "../../../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { toErrorMap } from "../../../../utils/toErrorMap";
import { isServer } from "../../../../utils/isServer";

interface RoleApplyProps {}

const RoleApply: React.FC<RoleApplyProps> = ({}) => {
  const router = useRouter();
  const { role } = router.query;
  const [{ data: roleInfo }] = useGetElectionRoleQuery({
    variables: { shortName: role as string },
  });
  const [{ data: me }] = useMeQuery({ pause: isServer() });
  const [, roleApply] = useRoleApplyMutation();

  if (roleInfo?.getElectionRole) {
    return (
      <Dashboard title={roleInfo.getElectionRole.title + " Application"}>
        <Formik
          initialValues={{
            ...roleApplyInitialValues,
            title: me?.me ? me.me.firstName + " " + me.me.lastName : "",
            shortName: me?.me
              ? me.me.firstName +
                "-" +
                me.me.lastName +
                "-" +
                roleInfo.getElectionRole.shortName
              : "",
            description: roleInfo.getElectionRole.manifestoTemplate!,
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await roleApply({
              manifestoInfo: values,
              roleShortName: role as string,
            });
            if (!response) {
              return;
            } else if (response.data?.roleApply.errors) {
              setErrors(toErrorMap(response.data.roleApply.errors));
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
  } else {
    return <Dashboard title="Loading Role" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(RoleApply);
