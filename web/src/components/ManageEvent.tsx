import {
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import {
  RegularEventFragment,
  RegularCourseFragment,
  RegularProjectFragment,
  RegularTalkFragment,
  RegularTutorialFragment,
  RegularUserFragment,
} from "../generated/graphql";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import Dashboard from "./Dashboard";

interface ManageEventProps {
  eventType: string;
  eventDetails:
    | RegularEventFragment
    | RegularCourseFragment
    | RegularProjectFragment
    | RegularTalkFragment
    | RegularTutorialFragment;
  eventUsers: RegularUserFragment[];
  handleRemoveUserFromEvent: (userId: number, eventId: number) => void;
}

const ManageEvent: React.FC<ManageEventProps> = ({
  eventType,
  eventDetails,
  eventUsers,
  handleRemoveUserFromEvent,
}) => {
  const copyEmails = () => {
    const emails: string[] = [];
    eventUsers.forEach((user) => {
      emails.push(user.email);
    });

    var csvString: string = "";

    emails.forEach((email) => {
      csvString += `${email},`;
    });

    if (csvString.length > 0) {
      csvString = csvString.slice(0, -1);
    }

    navigator.clipboard.writeText(csvString);
  };

  return (
    <Dashboard
      title={`Manage ${capitalizeFirstLetter(eventType)}`}
      narrow={true}
      options={
        <Button variant="primary" onClick={copyEmails}>
          Copy Emails (CSV)
        </Button>
      }
    >
      <Heading size="md">Members</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {eventUsers.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleRemoveUserFromEvent(user.id, eventDetails.id);
                    }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Dashboard>
  );
};

export default ManageEvent;
