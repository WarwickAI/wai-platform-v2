import { Flex, Input, Select, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  useGetUserPageQuery,
  useGetUserQuery,
  useGetUsersQuery,
  User,
} from "../../../generated/graphql";

interface UserPropertyProps {
  value: number;
  onChange: (v: number) => void;
  isEdit: boolean;
  isTitle?: boolean;
}

const UserProperty: React.FC<UserPropertyProps> = (props) => {
  const [userId, setUserId] = useState<number>(props.value);

  const [{ data: usersData }] = useGetUsersQuery();
  const [{ data: userSelectedData }] = useGetUserQuery({
    variables: { userId },
  });

  const users = useMemo(() => {
    if (usersData?.getUsers) {
      return usersData.getUsers as User[];
    }
    return [];
  }, [usersData]);

  const userSelected = useMemo(() => {
    if (userSelectedData?.getUser) {
      return userSelectedData.getUser as User;
    }
    return null;
  }, [userSelectedData]);

  useEffect(() => {
    setUserId(props.value);
  }, [props.value]);

  if (!props.isEdit) {
    return (
      <Flex
        height={props.isTitle ? 14 : 10}
        paddingInlineStart={4}
        paddingInlineEnd={4}
        alignItems="center"
        borderWidth={1}
        borderRadius="md"
        borderColor="white"
        onClick={() => navigator.clipboard.writeText(userSelected?.email || "")}
      >
        <Tooltip label={userSelected?.email}>
          <Text
            fontWeight={props.isTitle ? "bold" : "normal"}
            fontSize={props.isTitle ? "2xl" : "md"}
            wordBreak={"break-word"}
          >
            {userSelected
              ? userSelected.firstName + " " + userSelected.lastName
              : "No user to show"}
          </Text>
        </Tooltip>
      </Flex>
    );
  } else {
    return (
      <Select
        placeholder="Select a user"
        value={userId}
        onChange={(e) => {
          const userId = parseInt(e.target.value);
          setUserId(userId);
          props.onChange(userId);
        }}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName} ({user.email})
          </option>
        ))}
      </Select>
    );
  }
};

export default UserProperty;
