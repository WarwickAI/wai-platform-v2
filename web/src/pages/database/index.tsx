import React from "react";
import "@ericz1803/react-google-calendar/index.css";
import Dashboard from "../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Text } from "@chakra-ui/react";
import { useGetElementsQuery } from "../../generated/graphql";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const [{ data: databases }] = useGetElementsQuery({
    variables: { type: "Database" },
  });
  return (
    <Dashboard title="Databases">
      {databases &&
        databases.getElements.map((database) => {
          return <Text key={database.id}>{database.data.title}</Text>;
        })}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Generic);
