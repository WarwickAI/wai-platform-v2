import React, { useState } from "react";
import Dashboard from "../../../components/Dashboard";
import {
  useAssignUserPageMutation,
  useCreateElementMutation,
} from "../../../generated/graphql";
import { Button, Box, Heading, Input } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { createDefaultElementData } from "../../../utils/config";

interface PagesAdminProps {}

const PagesAdmin: React.FC<PagesAdminProps> = ({}) => {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [userUniId, setUserUniId] = useState<number | undefined>();

  const [, createElement] = useCreateElementMutation();
  const [, assignUserPage] = useAssignUserPageMutation();

  const createAndAssignUserPage = async () => {
    if (pageTitle && userUniId) {
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
        await assignUserPage({
          uniId: userUniId,
          pageId: pageId,
        });
      }
    }
  };
  return (
    <Dashboard title="Pages">
      <Box>
        <Heading size="md">Add User Page</Heading>
        <Input
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          placeholder={"Page Title"}
        />
        <Input
          value={userUniId}
          onChange={(e) => setUserUniId(parseInt(e.target.value))}
          placeholder={"User Uni ID"}
          type={"number"}
        />
        <Button variant={"admin"} onClick={createAndAssignUserPage}>
          Create
        </Button>
      </Box>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(PagesAdmin);
