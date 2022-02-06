import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Dashboard from "../../../../components/Dashboard";
import {
  useMeQuery,
  useGetElectionRoleQuery,
  useGetRoleManifestoQuery,
} from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { isServer } from "../../../../utils/isServer";
import { Button, HStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

interface RoleManifestoProps {}

const RoleManifesto: React.FC<RoleManifestoProps> = () => {
  const router = useRouter();
  const { role, manifesto } = router.query;
  const [{ data: manifestoDetails }] = useGetRoleManifestoQuery({
    variables: { shortName: manifesto as string },
  });
  const [{ data: userInfo }] = useMeQuery({
    pause: isServer(),
  });

  if (manifestoDetails?.getRoleManifesto) {
    return (
      <Dashboard
        title={manifestoDetails.getRoleManifesto.title}
        iconImg={manifestoDetails.getRoleManifesto.img}
        options={
          <HStack>
            {userInfo?.me?.role === "exec" && (
              <Button variant="admin" onClick={() => router.push(`/elections/${role}/manifestos/edit/${manifesto}`)}>
                Edit
              </Button>
            )}
          </HStack>
        }
      >
        {
          <ReactMarkdown>
            {manifestoDetails.getRoleManifesto.description}
          </ReactMarkdown>
        }
      </Dashboard>
    );
  } else {
    return <Dashboard title={"Loading Role Manifesto"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(RoleManifesto);
