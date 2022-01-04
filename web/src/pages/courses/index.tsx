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
  useCoursesQuery,
  useVerifyLoginMutation,
  useAllCoursesQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import ItemGrid from "../../components/ItemGrid";

const Courses = () => {
  const router = useRouter();
  const [{ data: courseData }] = useCoursesQuery();
  const [{ data: allCourseData }] = useAllCoursesQuery({ pause: isServer() });
  const [{ data: userData }] = useMeQuery({ pause: isServer() });

  const [showHidden, setShowHidden] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/courses");
    }
  }, [router, router.query]);
  return (
    <Dashboard
      title="Courses"
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
              onClick={() => router.push("/courses/create")}
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
        {(showHidden ? allCourseData?.allCourses : courseData?.courses)?.map(
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
              linkPrefix="courses"
              redirect={redirect}
            />
          )
        )}
      </ItemGrid>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Courses);
