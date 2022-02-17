import {
  Box,
  Tooltip,
  Flex,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../utils/accesToken";
import { isServer } from "../utils/isServer";
import personFill from "@iconify/icons-eva/person-fill";
import { getIcon } from "./SidebarConfig";

interface AccountPopoverProps {
  isMobile?: boolean;
}

const AccountPopover: React.FC<AccountPopoverProps> = (props) => {
  const [{ data: userData }] = useMeQuery({ pause: isServer() });
  const [, logout] = useLogoutMutation();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {props.isMobile ? (
        <Flex
          h={14}
          mx={-3}
          px={10}
          _hover={{
            backgroundColor: "rgba(145, 158, 171, 0.08)",
            cursor: "pointer",
          }}
          justifyContent="center"
          alignItems="center"
          onClick={onOpen}
        >
          {getIcon(personFill)}
          <Text pl={5}>Account</Text>
        </Flex>
      ) : (
        <Box>
          <Tooltip placement="right" label="Account">
            <Flex
              h={14}
              mx={-3}
              mt={6}
              mb={4}
              justifyContent="center"
              _hover={{
                backgroundColor: "rgba(145, 158, 171, 0.08)",
                cursor: "pointer",
              }}
              alignItems="center"
              onClick={onOpen}
            >
              {getIcon(personFill)}
            </Flex>
          </Tooltip>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {userData?.me ? `Hello ${userData.me.firstName}` : "Not Logged In"}
          </ModalBody>

          <ModalFooter>
            {userData && userData.me ? (
              <>
                <Button variant="primary" mr={3} disabled={true}>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountPopover;
