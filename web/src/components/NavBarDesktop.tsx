import {
  Box,
  Tooltip,
  Flex,
  Link,
  Image,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext } from "react";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import sidebarConfig from "./SidebarConfig";
import AccountPopover from "./AccountPopover";
import { useMeQuery } from "../generated/graphql";
import { EditContext } from "../utils/EditContext";

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

interface NavBarDesktopProps {}

const NavBarDesktop: React.FC<NavBarDesktopProps> = () => {
  const router = useRouter();
  const { isEdit, setIsEdit } = useContext(EditContext);
  const [{ data: userData }] = useMeQuery();

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
        <Flex
          h={14}
          mx={-3}
          my={6}
          justifyContent="center"
          alignItems="center"
          _hover={{
            cursor: "pointer",
          }}
        >
          <Image src="/static/logo2.png" alt="WAI Logo" width={12} />
        </Flex>
      </Link>
      <AccountPopover />
      {/* Edit Switch */}
      {!!userData?.me && (
        <Box>
          <Tooltip hasArrow placement="right" label={"Edit Mode"}>
            <Flex
              h={14}
              mx={-3}
              justifyContent="center"
              alignItems="center"
              borderRightColor="rgb(0, 171, 85)"
            >
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Switch
                  id="edit-mode"
                  isChecked={isEdit}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setIsEdit(e.target.checked);
                  }}
                />
              </FormControl>
            </Flex>
          </Tooltip>
        </Box>
      )}
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

export default NavBarDesktop;
