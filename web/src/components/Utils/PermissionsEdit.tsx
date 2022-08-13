import {
  Group,
  useGetGroupsQuery,
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

interface PermissionsEditProps {
  element: Element<any>;
}
const PermissionsEdit: React.FC<PermissionsEditProps> = (props) => {
  const [, updatePermissions] = useUpdatePermissionsMutation();
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
              groupsSelected={props.element.canEditGroups}
              onChange={(groups) => {
                updatePermissions({
                  elementId: props.element.id,
                  canEditGroups: groups.map((group) => group.id),
                });
              }}
              placeholder="Edit groups..."
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
}

const PermissionsSelect: React.FC<PermissionsSelectProps> = (props) => {
  const [{ data: groups }] = useGetGroupsQuery();

  return (
    <Select<
      { label: string; value: Group },
      true,
      GroupBase<{ label: string; value: Group }>
    >
      isMulti
      options={[
        {
          label: "Groups",
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
      value={props.groupsSelected.map((group) => {
        return { label: group.name, value: group as Group };
      })}
      onChange={(e) => {
        props.onChange(e.map((v) => v.value));
      }}
      chakraStyles={{
        container: (provided, state) => {
          return { w: "full", pos: "relative" };
        },
      }}
      placeholder={props.placeholder}
      size={"sm"}
    />
  );
};

export default PermissionsEdit;
