import React, { useMemo } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useRouter } from "next/router";
import {
  Badge,
  useClaimBadgeMutation,
  useHasBadgeQuery,
  useMeQuery,
} from "../../../generated/graphql";
import Head from "next/head";
import { useGetBadgeQuery } from "../../../generated/graphql";
import Dashboard from "../../../components/Dashboard";
import { BadgeCard } from "../../../components/Properties/Badges";
import { Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";

interface ClaimBadgeProps {}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({}) => {
  const router = useRouter();
  const { badgeId } = router.query;

  const [{ data: badgeQuery }] = useGetBadgeQuery({
    variables: { id: badgeId as string },
  });
  const [{ data: hasBadge }] = useHasBadgeQuery({
    variables: { id: badgeId as string },
  });
  const [, claimBadge] = useClaimBadgeMutation();

  const [{ data: userData }] = useMeQuery();

  const badge = useMemo(() => {
    if (badgeQuery?.getBadge) {
      return badgeQuery.getBadge;
    }
    return undefined;
  }, [badgeQuery]);

  const user = useMemo(() => {
    if (userData?.me) {
      return userData.me;
    }
    return undefined;
  }, [userData]);

  const canClaimBadge = useMemo(() => {
    if (!badge || !badge.canClaim) {
      return false;
    }

    if (badge.canClaim && !badge.claimUntil) {
      return true;
    }

    const claimUntilDate = new Date(0);
    claimUntilDate.setMilliseconds(parseInt(badge.claimUntil as string));
    console.log(claimUntilDate);

    return !badge.claimUntil || claimUntilDate > new Date();
  }, [badge]);

  if (!badge) {
    return (
      <Dashboard title="">
        <Text>Loading badge</Text>
      </Dashboard>
    );
  } else {
    return (
      <Dashboard title="">
        <Head>
          <title>Claim Badge</title>
        </Head>
        <Flex flexDirection={"column"} alignItems="center">
          <HStack>
            <Heading size={"lg"}>Claim Badge</Heading>
            <BadgeCard badge={badge as Badge} />
          </HStack>
          {!canClaimBadge ? (
            <HStack mt={4}>
              <Text>Badge cannot be claimed</Text>
            </HStack>
          ) : user ? (
            hasBadge?.hasBadge ? (
              <HStack mt={4}>
                <Text>Badge claimed!</Text>
              </HStack>
            ) : (
              <HStack mt={4}>
                <Text>Click</Text>
                <Button
                  onClick={() => claimBadge({ id: badge.id })}
                  variant={"primary"}
                  size={"sm"}
                >
                  Here
                </Button>
                <Text>to claim!</Text>
              </HStack>
            )
          ) : (
            <HStack mt={4}>
              <Text>Sign in</Text>
              <Button
                onClick={() => router.push("/login")}
                variant={"primary"}
                size={"sm"}
              >
                Here
              </Button>
              <Text>to claim!</Text>
            </HStack>
          )}
        </Flex>
      </Dashboard>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ClaimBadge);
