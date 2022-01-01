import React from "react";
import Dashboard from "../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useCreateProjectMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ReactMarkdown from "react-markdown";

interface CreateProjectProps {}

const CreateProject: React.FC<CreateProjectProps> = ({}) => {
  const router = useRouter();
  const [, createProject] = useCreateProjectMutation();
  return (
    <Dashboard title="Create Project">
      <Formik
        initialValues={{
          title: "",
          shortName: "",
          description: "",
          cover: "",
          display: false,
          difficulty: "",
          redirect: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createProject({ projectInfo: values });
          if (response.data?.createProject.errors) {
            setErrors(toErrorMap(response.data.createProject.errors));
          } else if (response.data?.createProject.project) {
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

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateProject);
