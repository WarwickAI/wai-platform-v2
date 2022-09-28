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
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { markdownTheme } from "../../theme";
import remarkGfm from "remark-gfm";
import { isSuper } from "../../utils/isAuth";

const ELECTION_DESCRIPTION = `
**Welcome to the Election page**

Applications open up from **6 pm Thursday 24th March** and close at **Midnight Thursday 3rd March**.

You can apply by selecting the role and clicking apply. Please make sure your application is correct before submitting it.

Voting opens up from **9 am Friday 4th March** and close at **5 pm Thursday 10th March**. Results will be announced at Code Night that evening so please come along.

You must have been a member for at least 2 weeks when voting opens to be able to vote.

If you have any problems with applying or voting, please contact **Joe (President)** or **Edward (Head of Engineering)** on Discord.

Below are all the open positions, Best of Luck!
`;

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
        title={"Elections"}
        options={
          userDetails?.me && isSuper(userDetails.me) ? (
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
        <ReactMarkdown
          components={ChakraUIRenderer(markdownTheme)}
          linkTarget="_self"
          remarkPlugins={[remarkGfm]}
        >
          {ELECTION_DESCRIPTION}
        </ReactMarkdown>
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

export default withUrqlClient(createUrqlClient, { ssr: false })(Projects);