import React from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { setAccessToken } from "../utils/accesToken";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (
            response.data?.register.user &&
            response.data.register.accessToken
          ) {
            // Registration worked, route to different page
            setAccessToken(response.data.register.accessToken);
            router.push("/");
          }
        }}
      >
        {() => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            ></InputField>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              ></InputField>
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                // disabled={!isSubmitting}
              >
                register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
