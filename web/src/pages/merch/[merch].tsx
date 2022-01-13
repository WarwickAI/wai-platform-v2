import { Heading, Button, HStack, Text, Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useMeQuery, useMerchByShortNameQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";
import { isServer } from "../../utils/isServer";

interface MerchProps {}

const Merch: React.FC<MerchProps> = ({}) => {
  const router = useRouter();
  const { merch } = router.query;
  const [{ data }] = useMerchByShortNameQuery({
    variables: { shortName: merch as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });

  return (
    <Dashboard
      title={data?.merchByShortName ? data?.merchByShortName.title : ""}
      narrow={true}
      options={
        <HStack>
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(`/merch/edit/${data?.merchByShortName?.shortName}`)
              }
            >
              Edit
            </Button>
          )}
        </HStack>
      }
    >
      {data?.merchByShortName?.description && (
        <ReactMarkdown>{data?.merchByShortName?.description}</ReactMarkdown>
      )}
      <Heading my={6} size="md">
        Buy
      </Heading>
      <Box>
        <HStack>
          {data?.merchByShortName?.variants.map((variant) => (
            <Button
              key={variant.name}
              variant="primary"
              onClick={() => router.push(variant.link)}
            >
              {variant.name}
            </Button>
          ))}
        </HStack>
      </Box>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Merch);
