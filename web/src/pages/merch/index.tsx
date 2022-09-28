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
  Heading,
} from "@chakra-ui/react";
import Dashboard from "../../components/Dashboard";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { setAccessToken } from "../../utils/accesToken";
import {
  useMeQuery,
  useMerchQuery,
  useAllMerchQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import ItemGrid from "../../components/ItemGrid";

const Merch = () => {
  const router = useRouter();
  const [{ data: merchData }] = useMerchQuery();
  const [{ data: allMerchData }] = useAllMerchQuery({ pause: isServer() });
  const [{ data: userData }] = useMeQuery({ pause: isServer() });

  const [showHidden, setShowHidden] = useState<boolean>(false);

  const merchItems = showHidden ? allMerchData?.allMerch : merchData?.merch;

  return (
    <Dashboard
      title="Merch"
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
              onClick={() => router.push("/merch/create")}
            >
              Create
            </Button>
          </HStack>
        ) : (
          <></>
        )
      }
    >
      {merchItems && merchItems.length > 0 ? (
        <ItemGrid>
          {(showHidden ? allMerchData?.allMerch : merchData?.merch)?.map(
            ({ title, shortName, id, image }) => (
              <Card
                key={id}
                title={title}
                backgroundImg={image}
                extraInfo=""
                shortName={shortName}
                linkPrefix="merch"
              />
            )
          )}
        </ItemGrid>
      ) : (
        <Heading size="md">Merch drop finished (for now...)</Heading>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Merch);
