import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface ManifestoCardProps {
  title: string | JSX.Element;
  redirect: string;
  img: string | undefined | null;
}

const ManifestoCard: React.FC<ManifestoCardProps> = (props) => {
  const router = useRouter();

  return (
    <Flex
      h={16}
      _hover={{ cursor: "pointer" }}
      onClick={() => router.push(props.redirect)}
      p={2}
      borderWidth={1}
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

export default ManifestoCard;
