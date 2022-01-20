import { HStack, Button, FormLabel, Switch } from "@chakra-ui/react";
import {
  RegularEventFragment,
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

interface EventsPageProps {
  eventType: string;
  events:
    | RegularEventFragment[]
    | RegularCourseFragment[]
    | RegularProjectFragment[]
    | RegularTalkFragment[]
    | RegularTutorialFragment[];
  allEvents:
    | RegularEventFragment[]
    | RegularCourseFragment[]
    | RegularProjectFragment[]
    | RegularTalkFragment[]
    | RegularTutorialFragment[];
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
      title={capitalizeFirstLetter(eventType)}
      options={
        userDetails?.role === "exec" ? (
          <HStack spacing={4}>
            <HStack>
              <FormLabel htmlFor="showAll">Show hidden</FormLabel>
              <Switch
                id="showAll"
                isChecked={showHidden}
                onChange={(e) => setShowHidden(e.target.checked)}
              />
            </HStack>
            <Button variant="primary" onClick={() => handleCreate()}>
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
          ({ title, previewImg, shortName, id, redirectUrl }) => (
            <Card
              key={id}
              title={title}
              backgroundImg={previewImg}
              // description={
              //   <Badge colorScheme="green" borderRadius="lg">
              //     {difficulty}
              //   </Badge>
              // }
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
