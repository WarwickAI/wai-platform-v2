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
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [{ data }] = useMeQuery({ pause: isServer() });
  const [, logout] = useLogoutMutation();

  return (
    <Box p={4}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Flex direction="row" justifyContent="space-between">
        <Button onClick={() => setOpen(true)} variant="primary">
          <HamburgerIcon />
        </Button>
        <Popover>
          <PopoverTrigger>
            <Button variant="primary">Account</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              {data?.me ? `Hello ${data.me.firstName}` : "Not Logged In"}
            </PopoverHeader>
            <PopoverBody>
              <HStack>
                {data && data.me ? (
                  <>
                    <Button variant="primary" disabled={true}>
                      Account Settings
                    </Button>
                    <Button
                      variant="primary"
                      onClick={async () => {
                        setAccessToken("");
                        await logout();
                        router.push("/");
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Log In
                  </Button>
                )}
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {/* <Button onClick={() => setOpen(true)}>Account</Button> */}
      </Flex>
      <Box px={props.narrow ? [5, 10, 20, 48, 80] : [5, 10, 20]} py={10}>
        <Flex direction="row" justifyContent="space-between">
          <Heading size="lg" pb={10}>
            {props.title}
          </Heading>
          {props.options}
        </Flex>
        {props.children}
      </Box>
      <>
        <Drawer isOpen={isOpen} placement="left" onClose={() => setOpen(false)}>
          <DrawerOverlay />
          <DrawerContent px={5} py={3} w={DRAWER_WIDTH}>
            <DrawerCloseButton />
            <Box>
              <Box w={20} pt={2} pb={10}>
                <Image src="/static/logo2.png" alt="WAI Logo" />
              </Box>
              <Box>
                {sidebarConfig.map(({ title, path, icon }) => {
                  // console.log(title);
                  return (
                    <NavItem
                      key={title}
                      title={title}
                      path={path}
                      icon={icon}
                      isHighlighted={router.pathname === path}
                    />
                  );
                })}
              </Box>
            </Box>
          </DrawerContent>
        </Drawer>
      </>
    </Box>
  );
};

export default Dashboard;
