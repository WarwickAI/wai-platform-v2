import React from "react";
import "@ericz1803/react-google-calendar/index.css";
import Dashboard from "../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { HStack, Text, VStack } from "@chakra-ui/react";
import {
  useGetElementsQuery,
  useRemoveElementMutation,
} from "../../generated/graphql";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const [{ data: databases }] = useGetElementsQuery({
    variables: { type: "Database" },
  });
  const [, removeElement] = useRemoveElementMutation();
  return (
    <Dashboard title="Databases">
      <VStack>
        {databases &&
          databases.getElements.map((database) => {
            return (
              <HStack key={database.id}>
                <Text>{database.data.title.value}</Text>
                <Text onClick={() => removeElement({ elementId: database.id })}>
                  X
                </Text>
              </HStack>
            );
          })}
      </VStack>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
