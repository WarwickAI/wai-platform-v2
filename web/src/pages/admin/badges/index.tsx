import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Dashboard from "../../../components/Dashboard";
import {
  AddBadgePopup,
  BadgeCard,
} from "../../../components/Properties/Badges";
import { useGetBadgesQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface BadgesAdminProps {}

const BadgesAdmin: React.FC<BadgesAdminProps> = () => {
  const [{ data: badgesQuery, fetching }] = useGetBadgesQuery();

  const badges = badgesQuery?.getBadges;

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  return (
    <Dashboard title="Badges">
      {fetching ? (
        <Text>Loading...</Text>
      ) : !badges ? (
        <Text>Error getting badges</Text>
      ) : (
        <>
          {badges.map((badge) => (
            <BadgeCard badge={badge} key={badge.id} />
          ))}
          {badges.length === 0 && <Text>No badges found</Text>}
        </>
      )}
      <Button onClick={onAddOpen} variant={"primary"}>
        +
      </Button>
      <AddBadgePopup
        isOpen={isAddOpen}
        onOpen={onAddOpen}
        onClose={onAddClose}
        onAddBadge={(badge) => {
          console.log(badge);
        }}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(BadgesAdmin);
