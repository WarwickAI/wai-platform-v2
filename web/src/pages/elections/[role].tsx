import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Dashboard from "../../components/Dashboard";
import {
  useMeQuery,
  useGetElectionRoleQuery,
  useGetRoleManifestoQuery,
  useElectionRoleManifestosQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import { Button, Heading, HStack, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ItemGrid from "../../components/ItemGrid";
import ManifestoCard from "../../components/ManifestoCard";

interface ElectionRoleProps {}

const ElectionRole: React.FC<ElectionRoleProps> = () => {
  const router = useRouter();
  const { role } = router.query;
  const [{ data: roleDetails }] = useGetElectionRoleQuery({
    variables: { shortName: role as string },
  });
  const [{ data: roleManifestos }] = useElectionRoleManifestosQuery({
    variables: { shortName: role as string },
  });
  const [{ data: userInfo }] = useMeQuery({
    pause: isServer(),
  });

  if (roleDetails?.getElectionRole) {
    return (
      <Dashboard
        title={roleDetails.getElectionRole.title}
        options={
          <HStack>
            {userInfo?.me?.role === "exec" && (
              <Button
                variant="admin"
                onClick={() => router.push(`/elections/edit/${role}`)}
              >
                Edit
              </Button>
            )}
            {userInfo?.me?.role === "exec" && (
              <Button variant="admin" onClick={() => {}}>
                Manage
              </Button>
            )}
            {userInfo?.me?.role === "exec" && (
              <Button
                variant="admin"
                onClick={() => router.push(`/elections/${role}/manifestos/create`)}
              >
                Add Manifesto
              </Button>
            )}
          </HStack>
        }
      >
        {
          <ReactMarkdown>
            {roleDetails.getElectionRole.description}
          </ReactMarkdown>
        }
        <Heading my={4} size="md">
          Manifestos
        </Heading>
        <ItemGrid>
          {roleManifestos?.electionRoleManifestos.map((manifesto) => (
            <ManifestoCard
              key={manifesto.id}
              title={manifesto.title}
              img={manifesto.img}
              redirect={`/elections/${role}/manifestos/${manifesto.shortName}`}
            />
          ))}
        </ItemGrid>
      </Dashboard>
    );
  } else {
    return <Dashboard title={"Loading Election Role"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ElectionRole);
