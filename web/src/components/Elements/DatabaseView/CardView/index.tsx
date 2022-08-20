import React from "react";
import { DatabaseElementData } from "../../../../utils/base_element_types";
import { Element } from "../../../../utils/config";
import ItemGrid from "../../../ItemGrid";
import Card from "./Card";

interface CardViewProps {
  database: Element<DatabaseElementData>;
  isEdit: boolean;
  rows: Element<any>[];
  addRow: (index: number) => void;
  removeRow: (elementId: number) => void;
}

const CardView: React.FC<CardViewProps> = (props) => {
  return (
    <ItemGrid>
      {props.rows.map((row) => {
        return (
          <Card
            key={row.id}
            elementId={row.id}
            title={row.data.title.value}
            backgroundImg={
              row.data.coverImg.value ? row.data.coverImg.value : undefined
            }
            //   description={
            //     <Flex flexWrap="wrap">
            //       {tags.map((tag) => (
            //         <Badge
            //           key={tag.title}
            //           backgroundColor={tag.color}
            //           mr={2}
            //           mb={2}
            //           borderRadius="lg"
            //         >
            //           {tag.title}
            //         </Badge>
            //       ))}
            //     </Flex>
            //   }
            //   extraInfo=""
          />
        );
      })}
    </ItemGrid>
  );
};

export default CardView;
