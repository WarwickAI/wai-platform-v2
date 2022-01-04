import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  Text,
  SimpleGrid,
  Badge,
  Button,
  HStack,
  Switch,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import Dashboard from "../../components/Dashboard";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { setAccessToken } from "../../utils/accesToken";
import {
  useMeQuery,
  useTutorialsQuery,
  useVerifyLoginMutation,
  useAllTutorialsQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import ItemGrid from "../../components/ItemGrid";

const Tutorials = () => {
  const router = useRouter();
  const [{ data: tutorialData }] = useTutorialsQuery();
  const [{ data: allTutorialData }] = useAllTutorialsQuery({ pause: isServer() });
  const [{ data: userData }] = useMeQuery({ pause: isServer() });

  const [showHidden, setShowHidden] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/tutorials");
    }
  }, [router, router.query]);
  return (
    <Dashboard
      title="Tutorials"
      options={
        userData?.me?.role === "exec" ? (
          <HStack spacing={4}>
            <HStack>
              <FormLabel htmlFor="showAll">Show hidden</FormLabel>
              <Switch
                id="showAll"
                isChecked={showHidden}
                onChange={(e) => setShowHidden(e.target.checked)}
              />
            </HStack>
            <Button
              variant="primary"
              onClick={() => router.push("/tutorials/create")}
            >
              Create
            </Button>
          </HStack>
        ) : (
          <></>
        )
      }
    >
      <ItemGrid>
        {(showHidden ? allTutorialData?.allTutorials : tutorialData?.tutorials)?.map(
          ({ title, cover, difficulty, shortName, id, redirect }) => (
            <Card
              key={id}
              title={title}
              backgroundImg={cover}
              description={
                <Badge colorScheme="green" borderRadius="lg">
                  {difficulty}
                </Badge>
              }
              extraInfo=""
              shortName={shortName}
              linkPrefix="tutorials"
              redirect={redirect}
            />
          )
        )}
      </ItemGrid>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Tutorials);
