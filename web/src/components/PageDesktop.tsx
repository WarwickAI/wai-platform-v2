import {
  Box,
  Flex,
  Link,
  Text,
  Image,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Head from "next/head";
import React from "react";
import sidebarConfig from "./SidebarConfig";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import personFill from "@iconify/icons-eva/person-fill";
import { Icon, IconifyIcon } from "@iconify/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { setAccessToken } from "../utils/accesToken";

const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={26} height={26} />
);

interface AccountPopoverProps {}

const AccountPopover: React.FC<AccountPopoverProps> = (props) => {
  const [{ data: userData }] = useMeQuery({ pause: isServer() });
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Box>
          <Tooltip placement="right" label="Account">
            <Flex
              h={14}
              mx={-3}
              mt={6}
              mb={4}
              justifyContent="center"
              alignItems="center"
            >
              {getIcon(personFill)}
            </Flex>
          </Tooltip>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          {userData?.me ? `Hello ${userData.me.firstName}` : "Not Logged In"}
        </PopoverHeader>
        <PopoverBody>
          <HStack>
            {userData && userData.me ? (
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
  );
};

interface NavItemProps {
  title: string;
  path: string;
  icon: any;
  isHighlighted: boolean;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const router = useRouter();
  return (
    <Link key={props.title} href={props.path} as={NextLink}>
      <Box>
        <Tooltip
          hasArrow
          placement="right"
          label={capitalizeFirstLetter(props.title)}
          onClick={() => router.push(props.path)}
        >
          <Flex
            h={14}
            mx={-3}
            justifyContent="center"
            alignItems="center"
            color={
              props.isHighlighted ? "rgb(0, 171, 85)" : "rgb(99, 115, 129)"
            }
            bgColor={props.isHighlighted ? "rgba(0, 171, 85, 0.08)" : ""}
            borderRightWidth={props.isHighlighted ? 3 : 0}
            borderRightColor="rgb(0, 171, 85)"
            _hover={{
              backgroundColor: "rgba(145, 158, 171, 0.08)",
              cursor: "pointer",
            }}
          >
            {props.icon && props.icon}
          </Flex>
        </Tooltip>
      </Box>
    </Link>
  );
};

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = (props) => {
  const router = useRouter();

  return (
    <Box
      w={16}
      h={"100%"}
      px={3}
      position="fixed"
      backgroundColor="white"
      boxShadow="1px 3px 12px -2px rgba(0,0,0,0.2)"
      overflowY="auto"
      overflowX="hidden"
      className="navbar"
    >
      <Link href={"/"} as={NextLink}>
        <Flex h={14} mx={-3} my={6} justifyContent="center" alignItems="center">
          <Image src="/static/logo2.png" alt="WAI Logo" width={12} />
        </Flex>
      </Link>
      <AccountPopover />
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
  );
};

interface PageDesktopProps {
  title: string;
  coverImg?: string;
}

export const PageDesktop: React.FC<PageDesktopProps> = (props) => {
  return (
    <Box>
      <NavBar />
      <Box flex={1} ml={16}>
        {props.coverImg && props.coverImg.length > 0 ? (
          <>
            <Box
              backgroundImage={`linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('${props.coverImg}')`}
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
              h={60}
              w={"100%"}
              position="sticky"
              top={0}
              zIndex={-1}
            />
            <Heading
              px={40}
              pt={10}
              pb={5}
              backgroundColor="rgba(255, 255, 255, 0.9)"
            >
              {props.title}
            </Heading>
            <Box px={40} pt={14} pb={20} backgroundColor="white">
              {props.children}
            </Box>
          </>
        ) : (
          <>
            <Heading
              px={40}
              pt={8}
              pb={4}
              backgroundColor="rgba(255, 255, 255, 0.9)"
            >
              {props.title}
            </Heading>
            <Box px={40} pt={8} pb={12} backgroundColor="white">
              {props.children}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
