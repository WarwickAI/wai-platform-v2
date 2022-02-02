import {
  Box,
  Tooltip,
  Flex,
  Link,
  Image,
  DrawerOverlay,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Text,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import sidebarConfig from "./SidebarConfig";
import AccountPopover from "./AccountPopover";
import { HamburgerIcon } from "@chakra-ui/icons";

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
      <Flex
        h={14}
        mx={-3}
        px={10}
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

interface NavDrawerProps {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

const NavDrawer: React.FC<NavDrawerProps> = (props) => {
  const router = useRouter();

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="left"
      onClose={() => props.setOpen(false)}
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent px={3} py={3} w={0}>
        <DrawerCloseButton />
        <Box
          overflowY="auto"
          overflowX="hidden"
          mx={-3}>
          <Link href={"/"} as={NextLink}>
            <Flex
              h={20}
              mx={-3}
              my={6}
              justifyContent="center"
              alignItems="center"
              _hover={{
                cursor: "pointer"
              }}
            >
              <Image src="/static/logo2.png" alt="WAI Logo" width={20} />
            </Flex>
          </Link>
          <AccountPopover isMobile={true} />
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
      </DrawerContent>
    </Drawer>
  );
};

interface NavBarMobileProps {}

const NavBarMobile: React.FC<NavBarMobileProps> = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box position="fixed" mx={4} my={4} zIndex={4}>
        <Button onClick={() => setOpen(true)} variant="primary">
          <HamburgerIcon />
        </Button>
      </Box>
      <NavDrawer isOpen={isOpen} setOpen={setOpen} />
    </>
  );
};

export default NavBarMobile;
