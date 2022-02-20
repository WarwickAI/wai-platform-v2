import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  Text,
  SimpleGrid,
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
import { useMeQuery, useBadgesQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import ItemGrid from "../../components/ItemGrid";

const Badge = () => {
  const router = useRouter();
  const [{ data: badgeData }] = useBadgesQuery();
  const [{ data: userData }] = useMeQuery({ pause: isServer() });

  const badgeItems = badgeData?.badges;

  return (
    <Dashboard
      title="Badge"
      options={
        userData?.me?.role === "exec" ? (
          <HStack spacing={4}>
            <Button
              variant="primary"
              onClick={() => router.push("/badges/create")}
            >
              Create
            </Button>
          </HStack>
        ) : (
          <></>
        )
      }
    >
      {badgeItems && badgeItems.length > 0 ? (
        <ItemGrid>
          {badgeItems.map(({ title, shortName, id, color }) => (
            <Card
              key={id}
              title={title}
              shortName={shortName}
              linkPrefix="badges"
            />
          ))}
        </ItemGrid>
      ) : (
        <Heading size="md">Coming Soon...</Heading>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Badge);
