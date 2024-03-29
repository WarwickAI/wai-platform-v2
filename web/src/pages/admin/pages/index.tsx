import React, { useMemo, useState } from "react";
import Dashboard from "../../../components/Dashboard";
import {
  useAssignUserPageMutation,
  useCreateElementMutation,
  useEditElementRouteMutation,
  useGetElementsQuery,
  useGetUsersQuery,
  User,
  useRemoveElementMutation,
} from "../../../generated/graphql";
import {
  Button,
  Box,
  Heading,
  Input,
  Select,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { createDefaultElementData } from "../../../utils/config";
import { useRouter } from "next/router";
import TextProperty from "../../../components/Properties/Text";

interface PagesAdminProps {}

const PagesAdmin: React.FC<PagesAdminProps> = ({}) => {
  const router = useRouter();
  const [{ data: usersQuery }] = useGetUsersQuery();

  const users = useMemo(() => {
    if (usersQuery?.getUsers) {
      return usersQuery.getUsers;
    }
    return [];
  }, [usersQuery]);

  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [newRoute, setNewRoute] = useState<string>("");
  const [removeElementId, setRemoveElementId] = useState<number | undefined>();

  const [, createElement] = useCreateElementMutation();
  const [, assignUserPage] = useAssignUserPageMutation();
  const [, editElementRoute] = useEditElementRouteMutation();
  const [, removeElement] = useRemoveElementMutation();

  const [{ data: pagesQuery }] = useGetElementsQuery({
    variables: { type: "Page" },
  });

  const routePages = useMemo(() => {
    if (!pagesQuery) {
      return [];
    }
    return pagesQuery.getElements.filter((e) => e.route);
  }, [pagesQuery]);

  const createAndAssignUserPage = async () => {
    if (!selectedUser) {
      return;
    }
    const pageTitle =
      selectedUser.firstName +
      " " +
      selectedUser.lastName +
      " (" +
      selectedUser.email +
      ")";
    const res = await createElement({
      index: 0,
      type: "Page",
      data: {
        ...createDefaultElementData("Page"),
        title: { type: "Text", value: pageTitle },
      },
    });
    if (res.data?.createElement) {
      const pageId = res.data.createElement.id;
      const assignUserPageRes = await assignUserPage({
        uniId: selectedUser.uniId ? selectedUser.uniId : -1,
        pageId: pageId,
      });

      if (assignUserPageRes.error) {
        console.log("Error assigning user page, removing new element");
        await removeElement({ elementId: pageId });
      }
    }
  };

  // Create a page with permissions as ADMIN and with no parent,
  // but with a URL that is the route of the page
  const createRootPage = () => {
    if (!newRoute) {
      return;
    }

    createElement({
      index: 0,
      type: "Page",
      route: newRoute,
      data: {
        ...createDefaultElementData("Page"),
      },
    });
  };

  return (
    <Dashboard title="Pages">
      <Box>
        <Heading size="md">Add User Page</Heading>

        <HStack>
          <Select
            placeholder="Select a user..."
            value={selectedUser?.id}
            onChange={(e) =>
              setSelectedUser(
                users[
                  users.findIndex((u) => u.id === parseInt(e.target.value)) ??
                    -1
                ] as User
              )
            }
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstName} {u.lastName} ({u.email})
              </option>
            ))}
          </Select>
          <Button
            variant={"admin"}
            onClick={() => createAndAssignUserPage()}
            disabled={!selectedUser}
          >
            Create
          </Button>
        </HStack>
      </Box>
      <Box mt={6}>
        <Heading size="md">Add Page With Route</Heading>
        <HStack>
          <Input
            placeholder="Route"
            value={newRoute}
            onChange={(e) => setNewRoute(e.target.value)}
          />
          <Button variant={"admin"} onClick={() => createRootPage()}>
            Create
          </Button>
        </HStack>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Title</Th>
              <Th>Route</Th>
            </Tr>
          </Thead>
          <Tbody>
            {routePages.map((p) => (
              <Tr key={p.id}>
                <Td>
                  <Box
                    onClick={() => router.push(p.route as string)}
                    _hover={{ cursor: "pointer" }}
                  >
                    ↗️
                  </Box>
                </Td>
                <Td>{p.data.title.value}</Td>
                <Td>
                  <TextProperty
                    isEdit={true}
                    onChange={(v) =>
                      editElementRoute({ elementId: p.id, route: v })
                    }
                    value={p.route + ""}
                  ></TextProperty>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box mt={6}>
        <Heading size="md">Remove Element</Heading>
        <HStack>
          <Input
            placeholder="Element ID"
            value={removeElementId}
            onChange={(e) => setRemoveElementId(parseInt(e.target.value))}
          />
          <Button
            variant={"admin"}
            onClick={() =>
              removeElementId && removeElement({ elementId: removeElementId })
            }
            disabled={!removeElementId}
          >
            Remove
          </Button>
        </HStack>
      </Box>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(PagesAdmin);
