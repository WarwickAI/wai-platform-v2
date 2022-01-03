import React from "react";
import Dashboard from "../../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../../utils/toErrorMap";
import { InputField } from "../../../components/InputField";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  useEditProjectMutation,
  useProjectByShortNameQuery,
  useProjectUsersQuery,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

interface EditProjectProps {}

const EditProject: React.FC<EditProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  const [{ data: projectUsers }] = useProjectUsersQuery({
    variables: { shortName: project as string },
    pause: isServer(),
  });
  return (
    <Dashboard title="Manage Project" narrow={true}>
      {projectUsers &&
        projectUsers.projectUsers.map((user) => (
          <Text key={user.id}>
            {user.firstName} {user.lastName}
          </Text>
        ))}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditProject);
