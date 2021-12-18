import { Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Dashboard from "../../components/Dashboard";
import { useProjectByShortNameQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";

interface ProjectProps {}

const Project: React.FC<ProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  return (
    <Dashboard
      title={
        data?.projectByShortName?.title ? data?.projectByShortName?.title : ""
      }
      narrow={true}
    >
      {data?.projectByShortName?.description && (
        <ReactMarkdown>{data?.projectByShortName?.description}</ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Project);
