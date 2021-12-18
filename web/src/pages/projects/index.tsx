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
import { UserInfoContext } from "../../utils/userContext";
import {
  useMeQuery,
  useProjectsQuery,
  useVerifyLoginMutation,
  useAllProjectsQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

const Projects = () => {
  const router = useRouter();
  const [{ data: projectData }] = useProjectsQuery();
  const [{ data: allProjectData }] = useAllProjectsQuery({ pause: isServer() });
  const [{ data: userData }] = useMeQuery({ pause: isServer() });

  const [showHidden, setShowHidden] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/projects");
    }
  }, [router, router.query]);
  return (
    <Dashboard
      title="Projects"
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
              onClick={() => router.push("/projects/create")}
            >
              Create
            </Button>
          </HStack>
        ) : (
          <></>
        )
      }
    >
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={3}>
        {(showHidden ? allProjectData?.allProjects : projectData?.projects)?.map(
          ({ title, cover, difficulty, shortName }, index) => (
            <Card
              key={index}
              title={title}
              backgroundImg={cover}
              description={
                <Badge colorScheme="green" borderRadius="lg">
                  {difficulty}
                </Badge>
              }
              extraInfo=""
              shortName={shortName}
            />
          )
        )}
      </SimpleGrid>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Projects);
