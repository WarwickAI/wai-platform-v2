import {
  HStack,
  Button,
  FormLabel,
  Switch,
  Flex,
  Badge,
  Box,
} from "@chakra-ui/react";
import {
  RegularCourseFragment,
  RegularProjectFragment,
  RegularTalkFragment,
  RegularTutorialFragment,
  RegularUserFragment,
} from "../generated/graphql";
import Dashboard from "./Dashboard";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import { useState } from "react";
import ItemGrid from "./ItemGrid";
import Card from "./Card";

type RegularEventFragment =
  | RegularCourseFragment
  | RegularProjectFragment
  | RegularTalkFragment
  | RegularTutorialFragment;

interface EventsPageProps {
  eventType: string;
  events: RegularEventFragment[];
  allEvents: RegularEventFragment[];
  userDetails?: RegularUserFragment;
  handleCreate: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({
  eventType,
  events,
  allEvents,
  userDetails,
  handleCreate,
}) => {
  const [showHidden, setShowHidden] = useState<boolean>(false);

  return (
    <Dashboard
      title={capitalizeFirstLetter(eventType) + "s"}
      options={
        userDetails?.role === "exec" ? (
          <HStack spacing={4}>
            <Flex flexDirection="column" alignItems="center">
              <FormLabel htmlFor="showAll" m={0}>Show hidden</FormLabel>
              <Switch
                id="showAll"
                isChecked={showHidden}
                onChange={(e) => setShowHidden(e.target.checked)}
              />
            </Flex>
            <Button variant="admin" onClick={() => handleCreate()}>
              Create
            </Button>
          </HStack>
        ) : (
          <></>
        )
      }
    >
      <ItemGrid>
        {(showHidden ? allEvents : events)?.map(
          ({ title, previewImg, shortName, id, redirectUrl, tags }) => (
            <Card
              key={id}
              title={title}
              backgroundImg={previewImg}
              description={
                <Flex>
                  {tags.map((tag) => (
                    <Badge
                      key={tag.title}
                      backgroundColor={tag.color}
                      mr={2}
                      borderRadius="lg"
                    >
                      {tag.title}
                    </Badge>
                  ))}
                </Flex>
              }
              extraInfo=""
              shortName={shortName}
              linkPrefix={eventType + "s"}
              redirect={redirectUrl ? redirectUrl : undefined}
            />
          )
        )}
      </ItemGrid>
    </Dashboard>
  );
};

export default EventsPage;
