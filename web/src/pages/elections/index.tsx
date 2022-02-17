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
  Heading,
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
              <Button
                variant="admin"
                onClick={() => router.push("/elections/create")}
              >
                Create
              </Button>
            </HStack>
          ) : (
            <></>
          )
        }
      >
        <Text mb={4}>
          Here are all the current positions that you can nominate yourself for.
        </Text>
        <Text mb={4}>
          Please ensure that you are an official member of the society at the
          time of applying for a role.
        </Text>
        <Text mb={4}>
          To be able to vote in these elections, you must have been a member for
          at least 2 weeks before voting opens, therefore members who sign up
          after 7pm, Thursday 17th February will not be able to vote.
        </Text>
        <Text mb={4}>
          To apply, make sure to sign in by clicking on the account button in
          the sidebar then clicking on the role and pressing the
          &quot;Apply&quot; button.
        </Text>
        <Heading my={4} size="md">
          Positions
        </Heading>
        {(showHidden && allRoles
          ? allRoles?.allElectionRoles
          : roles.electionRoles
        )?.length > 0 ? (
          <ItemGrid>
            {(showHidden
              ? allRoles?.allElectionRoles
              : roles.electionRoles
            )?.map(({ title, previewImg, shortName, id }) => (
              <Card
                key={id}
                title={title}
                backgroundImg={previewImg ? previewImg : undefined}
                extraInfo=""
                shortName={shortName}
                linkPrefix={"elections"}
              />
            ))}
          </ItemGrid>
        ) : (
          <Text>No positions currently available</Text>
        )}
      </Dashboard>
    );
  } else {
    return <Dashboard title="Loading election roles" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Projects);
