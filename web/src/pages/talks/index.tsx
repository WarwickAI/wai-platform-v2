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
  useTalksQuery,
  useVerifyLoginMutation,
  useAllTalksQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import ItemGrid from "../../components/ItemGrid";

const Talks = () => {
  const router = useRouter();
  const [{ data: talkData }] = useTalksQuery();
  const [{ data: allTalkData }] = useAllTalksQuery({ pause: isServer() });
  const [{ data: userData }] = useMeQuery({ pause: isServer() });

  const [showHidden, setShowHidden] = useState<boolean>(false);

  return (
    <Dashboard
      title="Talks"
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
              onClick={() => router.push("/talks/create")}
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
        {(showHidden ? allTalkData?.allTalks : talkData?.talks)?.map(
          ({ title, cover, shortName, id }) => (
            <Card
              key={id}
              title={title}
              backgroundImg={cover}
              extraInfo=""
              shortName={shortName}
              linkPrefix="talks"
            />
          )
        )}
      </ItemGrid>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Talks);
