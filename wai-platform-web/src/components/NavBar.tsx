import { Box, Button, Grid, Link } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../utils/accesToken";
import Router from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
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
      <Grid direction="row" container>
        <Grid item>
          <Box>{data?.me.username}</Box>
        </Grid>
        <Grid item>
          <Button onClick={logout}>logout</Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid p={4} ml="auto" bgcolor={"red"} container>
      <Grid ml="auto" item>
        <Box>{body}</Box>
      </Grid>
    </Grid>
  );
};
