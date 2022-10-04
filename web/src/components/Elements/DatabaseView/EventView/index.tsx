import { Box } from "@chakra-ui/react";
import React from "react";
import { DatabaseElementData } from "../../../../utils/base_element_types";
import { Element } from "../../../../utils/config";
import ItemGrid from "../../../ItemGrid";
import EventCard from "./EventCard";

interface EventViewProps {
  database: Element<DatabaseElementData>;
  isEdit: boolean;
  rows: Element<any>[];
  addRow: (index: number) => void;
  removeRow: (elementId: number) => void;
}

const EventView: React.FC<EventViewProps> = (props) => {
  return (
    <Box w={"full"}>
      <ItemGrid columns={[1, 1, 1, 2, 3, 4]}>
        {props.rows.map((row) => {
          return (
            <EventCard
              key={row.id}
              elementId={row.id}
              title={row.data.title.value}
              cardImg={
                row.data.cardImg.value ? row.data.cardImg.value : undefined
              }
              description={row.data.description.value}
              startDate={row.data.start.value}
              endDate={row.data.end.value}
              location={row.data.location.value}
            />
          );
        })}
      </ItemGrid>
    </Box>
  );
};

export default EventView;
