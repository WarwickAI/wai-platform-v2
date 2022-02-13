import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useMeQuery,
  useGetElectionRoleQuery,
  useGetRoleManifestoQuery,
  useElectionRoleManifestosQuery,
  useElectionRoleAllManifestosQuery,
  useGetUserRoleApplicationsQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Switch,
  Text,
} from "@chakra-ui/react";
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
  const [{ data: allRoleManifestos }] = useElectionRoleAllManifestosQuery({
    pause: isServer(),
    variables: { shortName: role as string },
  });
  const [{ data: userInfo }] = useMeQuery({
    pause: isServer(),
  });
  const [{ data: userRoleApplicationsRoles }] = useGetUserRoleApplicationsQuery(
    {
      pause: isServer(),
    }
  );

  const [showHiddenManifestos, setShowHiddenManifestos] = useState<boolean>(
    false
  );

  if (roleDetails?.getElectionRole) {
    return (
      <Dashboard
        title={roleDetails.getElectionRole.title}
        options={
          <HStack>
            {roleDetails.getElectionRole.canSubmitManifesto && (
              <Button
                variant="primary"
                onClick={() =>
                  router.push(`/elections/${role}/manifestos/apply`)
                }
                disabled={
                  userRoleApplicationsRoles?.getUserRoleApplications?.findIndex(
                    (val) => val.shortName == role
                  ) !== -1
                }
              >
                {userRoleApplicationsRoles?.getUserRoleApplications?.findIndex(
                  (val) => val.shortName == role
                ) !== -1
                  ? "Applied"
                  : "Apply"}
              </Button>
            )}
            {userInfo?.me?.role === "exec" && (
              <Flex flexDirection="column" alignItems="center">
                <FormLabel htmlFor="showAll" m={0}>
                  Show hidden
                </FormLabel>
                <Switch
                  id="showAll"
                  isChecked={showHiddenManifestos}
                  onChange={(e) => setShowHiddenManifestos(e.target.checked)}
                />
              </Flex>
            )}
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
            {/* {userInfo?.me?.role === "exec" && (
              <Button
                variant="admin"
                onClick={() =>
                  router.push(`/elections/${role}/manifestos/create`)
                }
              >
                Add Manifesto
              </Button>
            )} */}
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
          {(showHiddenManifestos
            ? allRoleManifestos?.electionRoleAllManifestos
            : roleManifestos?.electionRoleManifestos
          )?.map((manifesto) => (
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
