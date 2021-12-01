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
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { setAccessToken } from "../utils/accesToken";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (
            response.data?.login.user &&
            response.data.login.accessToken
          ) {
            // Registration worked, route to different page
            setAccessToken(response.data.login.accessToken);
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            ></InputField>
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
                login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
