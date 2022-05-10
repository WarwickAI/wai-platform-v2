import React from "react";
import "@ericz1803/react-google-calendar/index.css";
import Dashboard from "../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Text } from "@chakra-ui/react";
import {
  useGetDatabasesQuery,
} from "../../generated/graphql";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const [{ data: databases }] = useGetDatabasesQuery();
  return (
    <Dashboard title="Generic">
      {databases &&
        databases.getDatabases.map((database) => {
          return <Text key={database.id}>{database.props.title}</Text>;
        })}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Generic);
