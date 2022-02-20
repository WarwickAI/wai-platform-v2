import {
  Heading,
  Button,
  HStack,
  Text,
  Box,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useMeQuery, useBadgeByShortNameQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";
import { isServer } from "../../utils/isServer";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { markdownTheme } from "../../theme";
import remarkGfm from "remark-gfm";

interface BadgeProps {}

const Badge: React.FC<BadgeProps> = ({}) => {
  const router = useRouter();
  const { badge } = router.query;
  const [{ data }] = useBadgeByShortNameQuery({
    variables: { shortName: badge as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });

  return (
    <Dashboard
      title={data?.badgeByShortName ? data?.badgeByShortName.title : ""}
      options={
        <HStack>
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="admin"
              onClick={() =>
                router.push(`/badges/edit/${data?.badgeByShortName?.shortName}`)
              }
            >
              Edit
            </Button>
          )}
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="admin"
              onClick={() =>
                router.push(
                  `/badges/manage/${data?.badgeByShortName?.shortName}`
                )
              }
            >
              Manage
            </Button>
          )}
        </HStack>
      }
    >
      {data?.badgeByShortName?.description && (
        <ReactMarkdown
          components={ChakraUIRenderer(markdownTheme)}
          linkTarget="_self"
          remarkPlugins={[remarkGfm]}
        >
          {data?.badgeByShortName?.description}
        </ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Badge);
