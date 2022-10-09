import { Box } from "@chakra-ui/react";
import React from "react";
import { Element } from "../../../../utils/config";
import ItemGrid from "../../../ItemGrid";
import Event from "../../Event";

interface EventViewProps {
  isEdit: boolean;
  rows: Element<any>[];
  addRow: (index: number) => void;
  removeRow: (elementId: number) => void;
  oneColumn?: boolean;
}

const EventView: React.FC<EventViewProps> = (props) => {
  return (
    <Box w={"full"}>
      <ItemGrid columns={props.oneColumn ? [1] : [1, 1, 1, 2, 3, 4]}>
        {props.rows.map((row) => {
          return <Event element={row} isEdit={props.isEdit} key={row.id} />;
        })}
      </ItemGrid>
    </Box>
  );
};

export default EventView;
