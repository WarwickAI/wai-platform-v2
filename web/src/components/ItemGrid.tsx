import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

interface ItemGridProps {}

const ItemGrid: React.FC<ItemGridProps> = (props) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3, 4, 5]} spacing={3}>
      {props.children}
    </SimpleGrid>
  );
};

export default ItemGrid;
