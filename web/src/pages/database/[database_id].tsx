import React from "react";
import "@ericz1803/react-google-calendar/index.css";
import Dashboard from "../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import {
  useGetDatabaseQuery,
  useGetElementQuery,
} from "../../generated/graphql";
import FullPage from "../../components/Elements/FullPage";
import { PageElementType } from "../../utils/elements";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  const { database_id } = router.query;
  const [{ data: element }] = useGetDatabaseQuery({
    variables: { databaseId: parseInt(database_id as string) },
  });

  return (
    <Dashboard title="Generic">
      {element && (
        <FullPage
          key={element.getDatabase.id}
          element={element.getDatabase as PageElementType}
        />
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Generic);
