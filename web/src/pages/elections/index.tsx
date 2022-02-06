import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { setAccessToken } from "../../utils/accesToken";
import {
  useMeQuery,
  useProjectsQuery,
  useAllProjectsQuery,
  useElectionRolesQuery,
  useAllElectionRolesQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import EventsPage from "../../components/EventsPage";
import Dashboard from "../../components/Dashboard";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import events from "../events";
import {
  Text,
  HStack,
  Flex,
  FormLabel,
  Switch,
  Button,
  Badge,
} from "@chakra-ui/react";
import Card from "../../components/Card";
import ItemGrid from "../../components/ItemGrid";

const Projects = () => {
  const router = useRouter();
  const [{ data: roles }] = useElectionRolesQuery();
  const [{ data: allRoles }] = useAllElectionRolesQuery({ pause: isServer() });
  const [{ data: userDetails }] = useMeQuery({ pause: isServer() });

  const [showHidden, setShowHidden] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/elections");
    }
  }, [router, router.query]);
  if (roles?.electionRoles) {
    return (
      <Dashboard
        title={"Election Roles"}
        options={
          userDetails?.me?.role === "exec" ? (
            <HStack spacing={4}>
              <Flex flexDirection="column" alignItems="center">
                <FormLabel htmlFor="showAll" m={0}>
                  Show hidden
                </FormLabel>
                <Switch
                  id="showAll"
                  isChecked={showHidden}
                  onChange={(e) => setShowHidden(e.target.checked)}
                />
              </Flex>
              <Button variant="admin" onClick={() => router.push("/elections/create")}>
                Create
              </Button>
            </HStack>
          ) : (
            <></>
          )
        }
      >
        <Text mb={4}>This page shows you all the current positions that you can nominate yourself for. You will be able to vote on the ... if you have been a member for at least 2 weeks</Text>
        <ItemGrid>
          {(showHidden ? allRoles?.allElectionRoles : roles.electionRoles)?.map(
            ({ title, previewImg, shortName, id }) => (
              <Card
                key={id}
                title={title}
                backgroundImg={previewImg}
                extraInfo=""
                shortName={shortName}
                linkPrefix={"elections"}
              />
            )
          )}
        </ItemGrid>
      </Dashboard>
    );
  } else {
    return <Dashboard title="Loading election roles" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Projects);
