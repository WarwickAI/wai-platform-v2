import React from "react";
import Dashboard from "../../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../../utils/toErrorMap";
import { InputField } from "../../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ReactMarkdown from "react-markdown";
import {
  useEditProjectMutation,
  useProjectByShortNameQuery,
} from "../../../generated/graphql";

interface EditProjectProps {}

const EditProject: React.FC<EditProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  console.log(data);
  const [, editProject] = useEditProjectMutation();
  return (
    <Dashboard title="Edit Project" narrow={true}>
      <Formik
        initialValues={{
          title: data?.projectByShortName?.title || "",
          shortName: data?.projectByShortName?.shortName || "",
          description: data?.projectByShortName?.description || "",
          cover: data?.projectByShortName?.cover || "",
          display: data?.projectByShortName?.display || false,
          difficulty: data?.projectByShortName?.difficulty || "",
          redirect: data?.projectByShortName?.redirect || "",
          joinButton: data?.projectByShortName?.joinButton || false,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await editProject({
            projectInfo: values,
            id: data?.projectByShortName ? data.projectByShortName.id : 0,
          });
          if (response.data?.editProject.errors) {
            setErrors(toErrorMap(response.data.editProject.errors));
          } else if (response.data?.editProject.project) {
            // Project submitted
            router.push("/projects");
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
                name="description"
                placeholder="description"
                label="Description"
                textarea
                render
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="difficulty"
                placeholder="difficulty"
                label="Difficulty"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="cover"
                placeholder="cover"
                label="Cover"
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
                name="redirect"
                label="Redirect"
                placeholder="redirect"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="joinButton"
                label="Join Button"
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
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditProject);
