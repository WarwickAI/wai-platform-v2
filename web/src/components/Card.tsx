import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface CardProps {
  title: string | JSX.Element;
  description?: string | JSX.Element;
  extraInfo?: string | JSX.Element;
  backgroundImg?: string | JSX.Element;
  shortName?: string;
  linkPrefix?: string;
  redirect?: string;
}

const Card: React.FC<CardProps> = (props) => {
  const router = useRouter();
  const [{ data: meData }] = useMeQuery({ pause: isServer() });

  return (
    <Box
      maxW="sm"
      h={96}
      borderWidth={props.backgroundImg ? 0 : 1}
      borderRadius="2xl"
      overflow="hidden"
      backgroundImage={
        props.backgroundImg
          ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${props.backgroundImg}')`
          : ""
      }
      backgroundPosition={props.backgroundImg ? "center" : ""}
      backgroundRepeat={props.backgroundImg ? "no-repeat" : ""}
      backgroundSize={props.backgroundImg ? "cover" : ""}
      _hover={{ cursor: props.shortName ? "pointer" : "default" }}
      onClick={
        props.shortName
          ? () => {
              if (
                meData?.me?.role !== "exec" &&
                props.redirect &&
                props.redirect.length > 0
              ) {
                router.push(props.redirect);
              } else {
                router.push(
                  `/${props.linkPrefix ? props.linkPrefix : ""}/${
                    props.shortName
                  }`
                );
              }
            }
          : () => {}
      }
    >
      <Flex p={5} h="100%" justifyContent="flex-end" direction="column">
        {props.extraInfo && (
          <Text fontSize="xs" color="rgb(145, 158, 171)" pb={3}>
            {props.extraInfo}
          </Text>
        )}
        <Heading
          size="md"
          color={props.backgroundImg ? "white" : "black"}
          pb={4}
        >
          {props.title}
        </Heading>
        {props.description && <Text>{props.description}</Text>}
      </Flex>
    </Box>
  );
};

export default Card;
