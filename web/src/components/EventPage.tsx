import { HStack, Button, Badge, Flex } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import router from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  RegularCourseFragment,
  RegularProjectFragment,
  RegularTalkFragment,
  RegularTutorialFragment,
  RegularUserFragment,
} from "../generated/graphql";
import { markdownTheme } from "../theme";
import Dashboard from "./Dashboard";

interface EventPageProps {
  eventType: string;
  eventDetails:
    | RegularCourseFragment
    | RegularProjectFragment
    | RegularTalkFragment
    | RegularTutorialFragment;
  userDetails?: RegularUserFragment;
  userInEvent: boolean;
  handleJoin: (eventId: number) => Promise<boolean>;
  handleEdit: (eventId: number) => void;
  handleManage: (eventId: number) => void;
}

const EventPage: React.FC<EventPageProps> = ({
  eventDetails,
  userDetails,
  userInEvent,
  handleJoin,
  handleEdit,
  handleManage,
}) => {
  return (
    <Dashboard
      title={eventDetails.title}
      coverImg={eventDetails.coverImg ? eventDetails.coverImg : undefined}
      iconImg={eventDetails.iconImg ? eventDetails.iconImg : undefined}
      tags={
        <Flex mb={2} flexWrap="wrap">
          {eventDetails.tags.map((tag) => (
            <Badge
              key={tag.title}
              backgroundColor={tag.color}
              mr={2}
              mb={2}
              borderRadius="lg"
            >
              {tag.title}
            </Badge>
          ))}
        </Flex>
      }
      options={
        <HStack>
          {eventDetails.joinable && userDetails && (
            <Button
              variant="primary"
              onClick={async () => {
                const response = await handleJoin(eventDetails.id);
              }}
              disabled={userInEvent}
            >
              {userInEvent ? "Joined" : "Join"}
            </Button>
          )}
          {eventDetails.joinable && !userDetails && (
            <Button variant="primary" onClick={() => router.push("/login")}>
              Login to Join
            </Button>
          )}
          {userDetails?.role === "exec" &&
            eventDetails.redirectUrl &&
            eventDetails.redirectUrl.length > 0 && (
              <Button
                variant="admin"
                onClick={() =>
                  eventDetails.redirectUrl &&
                  router.push(eventDetails.redirectUrl)
                }
              >
                Follow Redirect
              </Button>
            )}
          {userDetails?.role === "exec" && (
            <Button variant="admin" onClick={() => handleEdit(eventDetails.id)}>
              Edit
            </Button>
          )}
          {userDetails?.role === "exec" && (
            <Button
              variant="admin"
              onClick={() => handleManage(eventDetails.id)}
            >
              Manage
            </Button>
          )}
        </HStack>
      }
    >
      {
        <ReactMarkdown
          components={ChakraUIRenderer(markdownTheme)}
          linkTarget="_self"
          remarkPlugins={[remarkGfm]}
        >
          {eventDetails.description ? eventDetails.description : ""}
        </ReactMarkdown>
      }
    </Dashboard>
  );
};

export default EventPage;
