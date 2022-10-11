import {
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  Badge as ChakraBadge,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import Dashboard from "../../../components/Dashboard";
import {
  AddBadgePopup,
  BadgeCard,
} from "../../../components/Properties/Badges";
import {
  Badge,
  useAddBadgeUserMutation,
  useGetBadgesQuery,
  useGetBadgeUsersQuery,
  useGetUsersQuery,
  User,
  useRemoveBadgeUserMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import QRCodeAlert from "../../../components/Utils/QRCodeAlert";

interface BadgesAdminProps {}

const BadgesAdmin: React.FC<BadgesAdminProps> = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | undefined>();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [, addUserBadge] = useAddBadgeUserMutation();
  const [, removeUserBadge] = useRemoveBadgeUserMutation();

  const [{ data: badgesQuery, fetching: fetchingBadges }] = useGetBadgesQuery();
  const [{ data: badgeUsersQuery, fetching: fetchingBadgeUsers }] =
    useGetBadgeUsersQuery({
      variables: {
        id: selectedBadge?.id || "",
      },
      pause: !selectedBadge,
    });
  const [{ data: usersQuery, fetching: fetchingUsers }] = useGetUsersQuery();

  const badges = badgesQuery?.getBadges;
  const badgeUsers = badgeUsersQuery?.getBadgeUsers;
  const users = usersQuery?.getUsers;

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isQROpen,
    onOpen: onQROpen,
    onClose: onQRClose,
  } = useDisclosure();

  return (
    <Dashboard title="Badges">
      {fetchingBadges ? (
        <Text>Loading...</Text>
      ) : !badges ? (
        <Text>Error getting badges</Text>
      ) : (
        <>
          {badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              onClick={() => {
                if (selectedBadge?.id === badge.id) {
                  setSelectedBadge(undefined);
                } else {
                  setSelectedBadge(badge);
                }
              }}
              selected={selectedBadge?.id === badge.id}
            />
          ))}
          {badges.length === 0 && <Text>No badges found</Text>}
        </>
      )}
      <Button onClick={onAddOpen} variant={"admin"} size={"sm"}>
        {selectedBadge ? "Edit" : "Add"} Badge
      </Button>
      {selectedBadge && (
        <Button onClick={onQROpen} variant={"admin"} size={"sm"} ml={2}>
          <Tooltip label={"Get Badge Claim URL and QR Code"}>🔗</Tooltip>
        </Button>
      )}
      <AddBadgePopup
        isOpen={isAddOpen}
        onOpen={onAddOpen}
        onClose={onAddClose}
        onAddBadge={(badge) => {}}
        editBadge={selectedBadge}
      />
      {selectedBadge && (
        <QRCodeAlert
          url={
            `${
              process.env.NODE_ENV === "development"
                ? "localhost:3000"
                : "https://warwick.ai"
            }/badges/claim/` + selectedBadge.id
          }
          isOpen={isQROpen}
          onOpen={onQROpen}
          onClose={onQRClose}
        />
      )}
      <Box mt={4}>
        {!selectedBadge ? (
          <Text>Select a badge to view users</Text>
        ) : fetchingBadgeUsers ? (
          <Text>Loading...</Text>
        ) : !badgeUsers ? (
          <Text>Error getting badge users</Text>
        ) : (
          <Box>
            {badgeUsers.map((badgeUser) => (
              <ChakraBadge key={badgeUser.id} m={1}>
                <HStack>
                  <Text>{badgeUser.email}</Text>
                  <Text
                    onClick={() =>
                      removeUserBadge({
                        id: selectedBadge.id,
                        userId: badgeUser.id,
                      })
                    }
                    cursor={"pointer"}
                  >
                    ❌
                  </Text>
                </HStack>
              </ChakraBadge>
            ))}
            {badgeUsers.length === 0 && <Text>No users given badge</Text>}

            <HStack mt={2}>
              <Select
                value={selectedUser?.id}
                onChange={(e) =>
                  setSelectedUser(
                    users?.find(
                      (user) => user.id === parseInt(e.target.value)
                    ) as User
                  )
                }
                disabled={!selectedBadge}
              >
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </Select>
              <Button
                onClick={() => {
                  if (!selectedUser) {
                    return;
                  }
                  addUserBadge({
                    id: selectedBadge.id,
                    userId: selectedUser?.id,
                  });
                }}
                variant={"admin"}
                size={"sm"}
                disabled={!selectedUser || !selectedBadge}
              >
                +
              </Button>
            </HStack>
          </Box>
        )}
      </Box>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(BadgesAdmin);
