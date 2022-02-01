import {
  Drawer,
  DrawerContent,
  Box,
  Flex,
  Image,
  Text,
  Link,
  DrawerOverlay,
  DrawerCloseButton,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Heading,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import sidebarConfig from "./SidebarConfig";
import NextLink from "next/link";
import Head from "next/head";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { setAccessToken } from "../utils/accesToken";
import { isServer } from "../utils/isServer";
import Page from "./Page";
import PageMobile from "./PageMobile";

const DRAWER_WIDTH = 280;

interface NavItemProps {
  title: string;
  path: string;
  icon: any;
  isHighlighted: boolean;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <Link key={props.title} href={props.path} as={NextLink}>
      <Flex
        mx={-5}
        pl={10}
        h={12}
        alignItems="center"
        color={props.isHighlighted ? "rgb(0, 171, 85)" : "rgb(99, 115, 129)"}
        bgColor={props.isHighlighted ? "rgba(0, 171, 85, 0.08)" : ""}
        borderRightWidth={props.isHighlighted ? 3 : 0}
        borderRightColor="rgb(0, 171, 85)"
        _hover={{
          backgroundColor: "rgba(145, 158, 171, 0.08)",
          cursor: "pointer",
        }}
      >
        {props.icon && props.icon}
        <Text pl={5}>{capitalizeFirstLetter(props.title)}</Text>
      </Flex>
    </Link>
  );
};

interface DashboardProps {
  title: string;
  narrow?: boolean;
  options?: JSX.Element;
  coverImg?: string;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <Page title={props.title} coverImg={props.coverImg}>
      {props.children}
    </Page>
  );
};

export default Dashboard;
