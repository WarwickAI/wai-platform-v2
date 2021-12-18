import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Text, SimpleGrid, Badge } from "@chakra-ui/react";
import Dashboard from "../components/Dashboard";
import Card from "../components/Card";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { setAccessToken } from "../utils/accesToken";
import { UserInfoContext } from "../utils/userContext";
import { useProjectsQuery } from "../generated/graphql";

const projectsDummy = [
  {
    title: "first",
    backgroundImg:
      "https://amplify-waiplatform-dev-222739-deployment.s3.eu-west-2.amazonaws.com/projects/counting-fingers.jpg",
    description: (
      <Badge colorScheme="green" borderRadius="lg">
        Success
      </Badge>
    ),
    extraInfo: "26 September 2021",
    shortName: "hello",
  },
  { title: "second" },
  { title: "third" },
  { title: "fourth" },
  { title: "fifth" },
  { title: "sixth" },
  { title: "seventh" },
  { title: "eighth" },
];

const Projects = () => {
  const { query } = useRouter();
  const { setUserInfo } = useContext(UserInfoContext);
  const [{ data }] = useProjectsQuery();

  useEffect(() => {
    if (query.accessToken && query.accessToken.length > 0) {
      const userInfo = setAccessToken(query.accessToken as string);
      setUserInfo(userInfo);
    }
  }, [query, setUserInfo]);
  return (
    <Dashboard title="Projects">
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={3}>
        {data?.projects.map(
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

export default withUrqlClient(createUrqlClient)(Projects);
