import {
  Popover,
  PopoverTrigger,
  Box,
  Tooltip,
  Flex,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  HStack,
  Button,
  Portal,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../utils/accesToken";
import { isServer } from "../utils/isServer";
import personFill from "@iconify/icons-eva/person-fill";
import { getIcon } from "./SidebarConfig";

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
      <Portal>
        <Box w="full" h="full" zIndex={-2}>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              {userData?.me
                ? `Hello ${userData.me.firstName}`
                : "Not Logged In"}
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
        </Box>
      </Portal>
    </Popover>
  );
};

export default AccountPopover;
