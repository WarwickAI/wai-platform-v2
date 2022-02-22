import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface ApplicationCardProps {
  title: string | JSX.Element;
  redirect?: string;
  img: string | undefined | null;
  selected?: boolean;
  onClick?: () => any;
}

const ApplicationCard: React.FC<ApplicationCardProps> = (props) => {
  const router = useRouter();

  return (
    <Flex
      h={16}
      _hover={{ cursor: "pointer" }}
      onClick={
        props.onClick !== undefined
          ? props.onClick
          : props.redirect
          ? () => router.push(props.redirect as string)
          : () => {}
      }
      p={2}
      borderWidth={1}
      borderColor={props.selected ? "primary.main" : "lightgray"}
      bg={props.selected ? "rgba(0, 171, 85, 0.08)" : "white"}
      overflow="hidden"
      borderRadius="2xl"
      alignItems="center"
    >
      {props.img && (
        <Image
          src={props.img}
          alt="Nomiation Image"
          width={12}
          height={12}
          objectFit="cover"
          borderRadius="full"
        />
      )}
      <Heading ml={props.img ? 2 : 14} size="md">
        {props.title}
      </Heading>
    </Flex>
  );
};

export default ApplicationCard;
