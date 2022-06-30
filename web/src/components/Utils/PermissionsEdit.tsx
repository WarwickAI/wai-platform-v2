import {
  Element,
  Group,
  useGetGroupsQuery,
  useUpdatePermissionsMutation,
} from "../../generated/graphql";
import { Select, GroupBase, MultiValue } from "chakra-react-select";
import { Flex, Text } from "@chakra-ui/react";

interface PermissionsEditProps {
  element: Element;
}
const PermissionsEdit: React.FC<PermissionsEditProps> = (props) => {
  const [, updatePermissions] = useUpdatePermissionsMutation();
  return (
    <>
      <Flex direction={"row"} alignItems="center" mb={2} width={"full"}>
        <Text mr={2} whiteSpace={"nowrap"}>
          Can Edit
        </Text>
        <PermissionsSelect
          groupsSelected={props.element.canEditGroups}
          onChange={(groups) => {
            updatePermissions({
              elementId: props.element.id,
              canEditGroups: groups.map((group) => group.id),
            });
          }}
        />
      </Flex>
      <Flex direction={"row"} alignItems="center" mb={2} width={"full"}>
        <Text mr={2} whiteSpace={"nowrap"}>
          Can View
        </Text>
        <PermissionsSelect
          groupsSelected={props.element.canViewGroups}
          onChange={(groups) => {
            updatePermissions({
              elementId: props.element.id,
              canViewGroups: groups.map((group) => group.id),
            });
          }}
        />
      </Flex>
      <Flex direction={"row"} alignItems="center" mb={2} width={"full"}>
        <Text mr={2} whiteSpace={"nowrap"}>
          Can Interact
        </Text>
        <PermissionsSelect
          groupsSelected={props.element.canInteractGroups}
          onChange={(groups) => {
            updatePermissions({
              elementId: props.element.id,
              canInteractGroups: groups.map((group) => group.id),
            });
          }}
        />
      </Flex>
    </>
  );
};

interface PermissionsSelectProps {
  groupsSelected: Group[];
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
        console.log(e);
        props.onChange(e.map((v) => v.value));
      }}
      chakraStyles={{
        container: (provided, state) => {
          return { w: "full" , pos: "relative"};
        },
      }}
    />
  );
};

export default PermissionsEdit;
