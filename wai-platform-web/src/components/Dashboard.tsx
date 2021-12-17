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
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import sidebarConfig from "./SidebarConfig";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { getAccessToken } from "../utils/accesToken";
import { UserInfoContext } from "../utils/userContext";
import { useRouter } from "next/router";

const DRAWER_WIDTH = 280;

interface NavItemProps {
  title: string;
  path: string;
  icon: any;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <Link key={props.title} href={props.path} as={NextLink}>
      <Flex mx={-5} pl={10}>
        {props.icon && props.icon}
        <Text>{props.title}</Text>
      </Flex>
    </Link>
  );
};

const Dashboard: React.FC = (props) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { userInfo } = useContext(UserInfoContext);
  console.log(sidebarConfig);
  return (
    <Box p={4}>
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
              {userInfo.isLoggedIn
                ? `Hello ${userInfo.firstName}`
                : "Not Logged In"}
            </PopoverHeader>
            <PopoverBody>
              {userInfo.isLoggedIn ? (
                <>
                  <Button variant="primary">Account Settings</Button>
                  <Button variant="primary">Logout</Button>
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
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {/* <Button onClick={() => setOpen(true)}>Account</Button> */}
      </Flex>
      {props.children}
      <>
        <Drawer isOpen={isOpen} placement="left" onClose={() => setOpen(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <Box
              px={5}
              py={3}
              w={DRAWER_WIDTH}
              borderRightColor="rgba(145, 158, 171, 0.24)"
              borderRightWidth={1}
            >
              <Box w={20}>
                <Image src="static/logo2.png" alt="WAI Logo" />
              </Box>
              <Text>Account</Text>
              <Box>
                {sidebarConfig.map(({ title, path, icon }) => {
                  // console.log(title);
                  return (
                    <NavItem
                      key={title}
                      title={title}
                      path={path}
                      icon={icon}
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
