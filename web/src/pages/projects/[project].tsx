import { Heading, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Dashboard from "../../components/Dashboard";
import {
  useMeQuery,
  useProjectByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";
import { isServer } from "../../utils/isServer";

interface ProjectProps {}

const Project: React.FC<ProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  const [{ data: userInfo }] = useMeQuery({ pause: isServer() });
  return (
    <Dashboard
      title={
        data?.projectByShortName?.title ? data?.projectByShortName?.title : ""
      }
      narrow={true}
      options={
        userInfo?.me?.role === "exec" ? (
          <Button
            variant="primary"
            onClick={() =>
              router.push(
                `/projects/edit/${data?.projectByShortName?.shortName}`
              )
            }
          >
            Edit
          </Button>
        ) : (
          <></>
        )
      }
    >
      {data?.projectByShortName?.description && (
        <ReactMarkdown>{data?.projectByShortName?.description}</ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Project);
