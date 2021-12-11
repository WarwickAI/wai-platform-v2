import { Drawer, Box, Flex, Image, Text, Link } from "@chakra-ui/react";
import { useState } from "react";
import sidebarConfig from "./SidebarConfig";
import NextLink from "next/link";

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
  const [isOpen, setOpen] = useState<boolean>(true);
  console.log(sidebarConfig);
  return (
    <Flex minHeight="100%" overflow="hidden">
      <Box w={DRAWER_WIDTH} flexShrink={0}>
        <Drawer isOpen={isOpen} onClose={() => setOpen(false)}>
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
                  <NavItem key={title} title={title} path={path} icon={icon} />
                );
              })}
            </Box>
          </Box>
        </Drawer>
      </Box>
      <Box flexGrow={1} overflow="auto" minHeight="100%" pt={30}>
        {props.children}
      </Box>
    </Flex>
  );
};

export default Dashboard;
