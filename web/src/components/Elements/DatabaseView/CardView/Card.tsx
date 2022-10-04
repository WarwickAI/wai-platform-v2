import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Tag } from "../../../../generated/graphql";
import { TagCard } from "../../../Properties/Tags";

interface CardProps {
  title: string | JSX.Element;
  elementId: number;
  description?: string | JSX.Element;
  extraInfo?: string | JSX.Element;
  cardImg?: string | JSX.Element;
  tags?: Tag[];
}

const Card: React.FC<CardProps> = (props) => {
  const router = useRouter();

  const cardImg = useMemo(
    () =>
      props.cardImg
        ? `https://${process.env.NEXT_PUBLIC_CDN}/${props.cardImg}`
        : undefined,
    [props.cardImg]
  );

  return (
    <Box
      // maxW="sm"
      h={96}
      borderWidth={cardImg ? 0 : 1}
      borderRadius="2xl"
      overflow="hidden"
      backgroundImage={
        cardImg
          ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${cardImg}')`
          : ""
      }
      backgroundPosition={cardImg ? "center" : ""}
      backgroundRepeat={cardImg ? "no-repeat" : ""}
      backgroundSize={cardImg ? "cover" : ""}
      _hover={{ cursor: "pointer" }}
      onClick={() => router.push(`/generic/${props.elementId}`)}
    >
      <Flex p={5} h="100%" justifyContent="flex-end" direction="column">
        {props.extraInfo && (
          <Text fontSize="xs" color="rgb(165, 178, 191)" pb={3}>
            {props.extraInfo}
          </Text>
        )}
        <Heading size="md" color={cardImg ? "white" : "black"} pb={4}>
          {props.title}
        </Heading>
        {props.description && <Text>{props.description}</Text>}
        {props.tags && (
          <Flex flexWrap="wrap">
            {props.tags.map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Card;
