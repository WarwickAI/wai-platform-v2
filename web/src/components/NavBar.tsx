import { Box, Button, Flex, Grid, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../utils/accesToken";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, logoutMutation] = useLogoutMutation();
  let body = null;

  const logout = async () => {
    // This will reset the refresh token cookie
    await logoutMutation();
    // Overwrite the access token
    setAccessToken("");
  };

  if (fetching) {
    //   Data is loading
  } else if (!data?.me) {
    //   User not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    // User logged in
    body = (
      <Flex>
        <Box>{data?.me.firstName}</Box>
        <Button onClick={logout}>logout</Button>
      </Flex>
    );
  }

  return (
    <Flex p={4} ml="auto" bg="tan">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
