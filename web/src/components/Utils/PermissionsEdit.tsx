import {
  Element,
  Group,
  useGetGroupsQuery,
  useUpdatePermissionsMutation,
} from "../../generated/graphql";
import { Select, GroupBase, MultiValue } from "chakra-react-select";

interface PermissionsEditProps {
  element: Element;
}

const PermissionsEdit: React.FC<PermissionsEditProps> = (props) => {
  const [, updatePermissions] = useUpdatePermissionsMutation();
  return (
    <PermissionsSelect
      groupsSelected={props.element.canEditGroups}
      onChange={(groups) => {
        updatePermissions({
          elementId: props.element.id,
          canEditGroups: groups.map((group) => group.id),
        });
      }}
    />
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
    />
  );
};

export default PermissionsEdit;
