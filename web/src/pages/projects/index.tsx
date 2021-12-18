import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Text, SimpleGrid, Badge, Button } from "@chakra-ui/react";
import Dashboard from "../../components/Dashboard";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { setAccessToken } from "../../utils/accesToken";
import { UserInfoContext } from "../../utils/userContext";
import {
  useMeQuery,
  useProjectsQuery,
  useVerifyLoginMutation,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

const Projects = () => {
  const router = useRouter();
  const [{ data: projectData }] = useProjectsQuery();
  const [{ data: userData }] = useMeQuery({pause: isServer()});

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
    }
  }, [router.query]);
  return (
    <Dashboard
      title="Projects"
      options={
        userData?.me?.role === "exec" ? (
          <Button
            variant="primary"
            onClick={() => router.push("/projects/create")}
          >
            Create
          </Button>
        ) : (
          <></>
        )
      }
    >
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={3}>
        {projectData?.projects.map(
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
