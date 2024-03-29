import {
  Group,
  useGetGroupsQuery,
  useMeQuery,
  User,
  useUpdatePermissionsMutation,
} from "../../generated/graphql";
import { Select, GroupBase } from "chakra-react-select";
import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";
import { Element } from "../../utils/config";
import { useMemo, useState } from "react";
import { checkPermissions } from "../../utils/isAuth";

interface PermissionsEditProps {
  element: Element<any>;
}
const PermissionsEdit: React.FC<PermissionsEditProps> = (props) => {
  const [, updatePermissions] = useUpdatePermissionsMutation();
  const [{ data: meQuery }] = useMeQuery();

  const canEditPerms = useMemo(() => {
    return checkPermissions(
      props.element.canModifyPermsGroups as Group[],
      meQuery?.me as User
    );
  }, [props.element.canModifyPermsGroups, meQuery?.me]);

  return (
    <Popover autoFocus={true} returnFocusOnClose={false} placement={"right"}>
      <PopoverTrigger>
        <Button size={"sm"} variant="setting">
          Permissions
        </Button>
      </PopoverTrigger>
      <PopoverContent w={80}>
        <PopoverBody>
          <VStack>
            <PermissionsSelect
              groupsSelected={props.element.canModifyPermsGroups || []}
              onChange={(groups) => {
                updatePermissions({
                  elementId: props.element.id,
                  canModifyPermsGroups: groups.map((group) => group.id),
                });
              }}
              placeholder="Edit permissions groups..."
              disabled={!canEditPerms}
            />
            <PermissionsSelect
              groupsSelected={props.element.canEditGroups}
              onChange={(groups) => {
                updatePermissions({
                  elementId: props.element.id,
                  canEditGroups: groups.map((group) => group.id),
                });
              }}
              placeholder="Edit groups..."
              disabled={!canEditPerms}
            />
            <PermissionsSelect
              groupsSelected={props.element.canViewGroups}
              onChange={(groups) => {
                updatePermissions({
                  elementId: props.element.id,
                  canViewGroups: groups.map((group) => group.id),
                });
              }}
              placeholder="View groups..."
              disabled={!canEditPerms}
            />
            <PermissionsSelect
              groupsSelected={props.element.canInteractGroups}
              onChange={(groups) => {
                updatePermissions({
                  elementId: props.element.id,
                  canInteractGroups: groups.map((group) => group.id),
                });
              }}
              placeholder="Interact groups..."
              disabled={!canEditPerms}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface PermissionsSelectProps {
  groupsSelected: Group[];
  placeholder?: string;
  onChange: (groups: Group[]) => void;
  disabled?: boolean;
}

const PermissionsSelect: React.FC<PermissionsSelectProps> = (props) => {
  const [{ data: groups }] = useGetGroupsQuery();
  const [groupsSelected, setGroupsSelected] = useState<Group[]>(
    props.groupsSelected
  );

  return (
    <Select<
      { label: string; value: Group },
      true,
      GroupBase<{ label: string; value: Group }>
    >
      isMulti
      options={[
        {
          label: props.placeholder || "Groups",
          options: groups
            ? groups?.groups.map((group) => {
                return {
                  label: group.name,
                  value: group as Group,
                };
              })
            : [],
        },
      ]}
      value={groupsSelected.map((group) => {
        return { label: group.name, value: group as Group };
      })}
      onChange={(e) => {
        setGroupsSelected(e.map((group) => group.value));
        props.onChange(e.map((v) => v.value));
      }}
      chakraStyles={{
        container: (provided, state) => {
          return { w: "full", pos: "relative" };
        },
      }}
      placeholder={props.placeholder}
      size={"sm"}
      isDisabled={props.disabled}
    />
  );
};

export default PermissionsEdit;
