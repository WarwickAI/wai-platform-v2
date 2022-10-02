import React from "react";
import Dashboard from "../../../components/Dashboard";
import { Box, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import {
  MemberInfoInput,
  useAddMemberInfoMutation,
} from "../../../generated/graphql";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";

interface AddMemberInfoProps {}

const AddMemberInfo: React.FC<AddMemberInfoProps> = ({}) => {
  const [, addMemberInfo] = useAddMemberInfoMutation();
  const router = useRouter();

  const sendMemberInfo = async (
    values: { data: string },
    { setErrors }: any
  ) => {
    const formattedData = values.data.split("\n").map((line) => {
      const userDataString = line.split("\t");
      const userData: MemberInfoInput = {
        name: userDataString[0],
        uniId: parseInt(userDataString[1]),
        dataJoined: userDataString[2],
      };
      return userData;
    });
    const response = await addMemberInfo({ memberInfo: formattedData });
    if (response.data?.addMemberInfo) {
      router.push("/admin/users");
    }
  };

  return (
    <Dashboard title="Users">
      <Formik
        initialValues={{
          data: "",
        }}
        onSubmit={sendMemberInfo}
      >
        {(formProps) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="data"
                placeholder="data"
                label="Data"
                type="textarea"
                hint="Copy and paste into here the member info from Warwick SU members panel and click on Group"
              />
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

export default withUrqlClient(createUrqlClient, { ssr: false })(AddMemberInfo);
