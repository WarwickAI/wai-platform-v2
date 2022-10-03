import { Box } from "@chakra-ui/react";
import React from "react";
import { useGetTagsQuery } from "../../../../generated/graphql";
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
  const [{ data: allTagsQuery }] = useGetTagsQuery();

  const allTags = allTagsQuery?.getTags;

  return (
    <Box w={"full"}>
      <ItemGrid>
        {props.rows.map((row) => {
          const selectedTags =
            row.data.tags?.value &&
            allTags?.filter((tag) => row.data.tags.value.includes(tag.id));

          return (
            <Card
              key={row.id}
              elementId={row.id}
              title={row.data.title.value}
              cardImg={
                row.data.cardImg.value ? row.data.cardImg.value : undefined
              }
              tags={selectedTags}
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
    </Box>
  );
};

export default CardView;
