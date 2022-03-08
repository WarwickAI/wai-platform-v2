import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Dashboard from "../../../../components/Dashboard";
import {
  useMeQuery,
  useGetElectionRoleQuery,
  useGetRoleApplicationQuery,
} from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { isServer } from "../../../../utils/isServer";
import { Button, HStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { markdownTheme } from "../../../../theme";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import remarkGfm from "remark-gfm";
import { isSuper } from "../../../../utils/isAuth";

interface RoleApplicationProps {}

const RoleApplication: React.FC<RoleApplicationProps> = () => {
  const router = useRouter();
  const { role, application } = router.query;
  const [{ data: applicationDetails }] = useGetRoleApplicationQuery({
    variables: { shortName: application as string },
  });
  const [{ data: userInfo }] = useMeQuery({
    pause: isServer(),
  });

  if (applicationDetails?.getRoleApplication) {
    return (
      <Dashboard
        title={applicationDetails.getRoleApplication.title}
        iconImg={
          applicationDetails.getRoleApplication.img
            ? applicationDetails.getRoleApplication.img
            : undefined
        }
        options={
          <HStack>
            {userInfo?.me && isSuper(userInfo.me) && (
              <Button
                variant="admin"
                onClick={() =>
                  router.push(
                    `/elections/${role}/applications/edit/${application}`
                  )
                }
              >
                Edit
              </Button>
            )}
          </HStack>
        }
      >
        {
          <ReactMarkdown
            components={ChakraUIRenderer(markdownTheme)}
            linkTarget="_self"
            remarkPlugins={[remarkGfm]}
          >
            {applicationDetails.getRoleApplication.description}
          </ReactMarkdown>
        }
      </Dashboard>
    );
  } else {
    return <Dashboard title={"Loading Role Application"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  RoleApplication
);
