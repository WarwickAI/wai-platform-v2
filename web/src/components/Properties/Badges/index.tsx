import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge as ChakraBadge,
  Flex,
  HStack,
  Input,
  Text,
  AlertDialogFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { GroupBase, Select } from "chakra-react-select";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Badge,
  useCreateBadgeMutation,
  useGetBadgesQuery,
} from "../../../generated/graphql";

interface BadgesPropertyProps {
  value: string[];
  onChange: (v: string[]) => void;
  isEdit: boolean;
}

const BadgesProperty: React.FC<BadgesPropertyProps> = (props) => {
  const [{ data: allBadgesQuery }] = useGetBadgesQuery();
  const [selectedBadges, setSelectedBadges] = useState<Badge[]>([]);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const allBadges = useMemo(() => {
    if (!allBadgesQuery) {
      return [];
    }
    return allBadgesQuery.getBadges as Badge[];
  }, [allBadgesQuery]);

  useEffect(() => {
    if (!props.value) {
      return;
    }
    const selectedBadges = allBadges.filter((badge) =>
      props.value.includes(badge.id)
    );
    setSelectedBadges(selectedBadges);
  }, [props.value, allBadges]);

  if (!props.isEdit) {
    return (
      <Flex flexWrap="wrap">
        {selectedBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </Flex>
    );
  } else {
    return (
      <HStack>
        <Select<
          { label: string; value: Badge },
          true,
          GroupBase<{ label: string; value: Badge }>
        >
          isMulti
          options={[
            {
              label: "Tags",
              options: allBadges.map((badge) => {
                return {
                  label: badge.name,
                  value: badge as Badge,
                };
              }),
            },
          ]}
          value={selectedBadges.map((badge) => {
            return { label: badge.name, value: badge as Badge };
          })}
          onChange={(e) => {
            setSelectedBadges(e.map((group) => group.value));
            props.onChange(e.map((v) => v.value.id));
          }}
          chakraStyles={{
            container: (provided, state) => {
              return { w: "full", pos: "relative" };
            },
          }}
          placeholder="Tags"
        />
        <Button size={"sm"} variant="primary" onClick={onAddOpen}>
          +
        </Button>
        <AddBadgePopup
          isOpen={isAddOpen}
          onOpen={onAddOpen}
          onClose={onAddClose}
          onAddBadge={(badge) => {
            setSelectedBadges([...selectedBadges, badge]);
            props.onChange([...props.value, badge.id]);
          }}
        />
      </HStack>
    );
  }
};

interface BadgeCardProps {
  badge: Badge;
}

export const BadgeCard: React.FC<BadgeCardProps> = (props) => {
  return (
    <ChakraBadge
      bg={props.badge.color}
      textColor="white"
      borderRadius={"lg"}
      mr={2}
      mb={2}
    >
      <Tooltip label={props.badge.description} hasArrow>
        {props.badge.name}
      </Tooltip>
    </ChakraBadge>
  );
};

interface AddBadgePopupProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAddBadge: (v: Badge) => void;
}

export const AddBadgePopup: React.FC<AddBadgePopupProps> = (props) => {
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();

  const [badgeName, setBadgeName] = useState("");
  const [badgeColor, setBadgeColor] = useState("#000000");
  const [badgeDescription, setBadgeDescription] = useState("");

  const [, createBadge] = useCreateBadgeMutation();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      // @ts-ignore
      leastDestructiveRef={cancelAddRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Create New Badge -{" "}
            <BadgeCard
              badge={{
                id: "9999",
                name: badgeName,
                description: badgeDescription,
                color: badgeColor,
                createdAt: "1",
                updatedAt: "1",
                canClaim: false,
              }}
            ></BadgeCard>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Name:
              </Text>
              <Input
                onChange={(e) => {
                  setBadgeName(e.target.value);
                }}
                value={badgeName}
              />
            </Flex>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Description:
              </Text>
              <Input
                onChange={(e) => {
                  setBadgeDescription(e.target.value);
                }}
                value={badgeDescription}
              />
            </Flex>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Color:
              </Text>
              <input
                type="color"
                onChange={(e) => {
                  setBadgeColor(e.target.value);
                }}
                value={badgeColor}
              />
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelAddRef}
              colorScheme="red"
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              ml={3}
              onClick={async () => {
                // Create new tag
                const newBadge = await createBadge({
                  name: badgeName,
                  color: badgeColor,
                  description: badgeDescription,
                });
                console.log(newBadge);
                if (newBadge.data?.createBadge) {
                  props.onAddBadge(newBadge.data?.createBadge);
                  // Reset fields
                  setBadgeName("");
                  setBadgeColor("");
                  setBadgeDescription("");

                  props.onClose();
                }
              }}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default BadgesProperty;
