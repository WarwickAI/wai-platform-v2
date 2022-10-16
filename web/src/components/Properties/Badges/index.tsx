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
  Switch,
  VStack,
} from "@chakra-ui/react";
import { GroupBase, Select } from "chakra-react-select";
import { format } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Badge,
  useCreateBadgeMutation,
  useGetBadgesQuery,
  useUpdateBadgeMutation,
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
  onClick?: () => void;
  selected?: boolean;
}

export const BadgeCard: React.FC<BadgeCardProps> = (props) => {
  return (
    <ChakraBadge
      bg={props.badge.color}
      textColor="white"
      borderRadius={"lg"}
      mr={2}
      mb={2}
      onClick={props.onClick}
      borderWidth={props.selected ? 4 : 0}
      borderColor={"gray"}
      cursor={props.onClick ? "pointer" : "default"}
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
  editBadge?: Badge;
}

export const AddBadgePopup: React.FC<AddBadgePopupProps> = (props) => {
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();

  const [badgeName, setBadgeName] = useState(props.editBadge?.name || "");
  const [badgeColor, setBadgeColor] = useState(
    props.editBadge?.color || "#000000"
  );
  const [badgeDescription, setBadgeDescription] = useState(
    props.editBadge?.description || ""
  );
  const [canClaim, setCanClaim] = useState(props.editBadge?.canClaim || false);
  const [claimUntil, setClaimUntil] = useState<Date | undefined>(
    props.editBadge?.claimUntil
      ? new Date(props.editBadge?.claimUntil)
      : undefined
  );

  const [, createBadge] = useCreateBadgeMutation();
  const [, editBadge] = useUpdateBadgeMutation();

  // Update tag properties if editBadge passed in
  useEffect(() => {
    if (!props.editBadge) {
      resetFields();
      return;
    }
    setBadgeName(props.editBadge.name);
    setBadgeColor(props.editBadge.color);
    setBadgeDescription(props.editBadge.description || "");
    setCanClaim(props.editBadge.canClaim || false);
    if (props.editBadge.claimUntil) {
      const claimUntilDate = new Date(0);
      claimUntilDate.setMilliseconds(
        parseInt(props.editBadge.claimUntil as string)
      );
      setClaimUntil(claimUntilDate);
    } else {
      setClaimUntil(undefined);
    }
  }, [props.editBadge]);

  const resetFields = () => {
    setBadgeName("");
    setBadgeColor("#000000");
    setBadgeDescription("");
    setCanClaim(false);
    setClaimUntil(undefined);
  };

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
            {props.editBadge ? "Edit" : "Create"} Badge -{" "}
            <BadgeCard
              badge={{
                id: props.editBadge?.id || "9999",
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
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Can Claim:
              </Text>
              <Switch
                isChecked={canClaim}
                onChange={(e) => {
                  setCanClaim(e.target.checked);
                }}
              />
            </Flex>
            {canClaim && (
              <Flex direction={"row"} alignItems="center" mb={2}>
                <Text mr={2} whiteSpace="nowrap">
                  Claim Until:
                </Text>
                <VStack>
                  <Text>
                    {claimUntil && format(claimUntil, "iii MMM d kk:mm")}
                  </Text>
                  <Input
                    type="datetime-local"
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      setClaimUntil(newDate);
                    }}
                  />
                </VStack>
              </Flex>
            )}
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
                // Create/edit badge
                if (props.editBadge) {
                  // Only update badge properties that have changed
                  const editedBadge = await editBadge({
                    id: props.editBadge.id,
                    properties: {
                      name:
                        badgeName !== props.editBadge.name
                          ? badgeName
                          : undefined,
                      description:
                        badgeDescription !== props.editBadge.description
                          ? badgeDescription
                          : undefined,
                      color:
                        badgeColor !== props.editBadge.color
                          ? badgeColor
                          : undefined,
                      canClaim:
                        canClaim !== props.editBadge.canClaim
                          ? canClaim
                          : undefined,
                      claimUntil:
                        claimUntil !== props.editBadge.claimUntil
                          ? claimUntil?.toISOString()
                          : undefined,
                    },
                  });

                  if (!editedBadge.error) {
                    resetFields();
                    props.onClose();
                  }
                } else {
                  const newBadge = await createBadge({
                    name: badgeName,
                    color: badgeColor,
                    description: badgeDescription,
                    canClaim: canClaim || false,
                    claimUntil: claimUntil?.toISOString(),
                  });

                  if (!newBadge.error && newBadge.data) {
                    props.onAddBadge(newBadge.data.createBadge);
                    resetFields();
                    props.onClose();
                  }
                }
              }}
            >
              {props.editBadge ? "Edit" : "Create"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default BadgesProperty;
