import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useMemo, useRef } from "react";
import { format } from "date-fns";
import FormattedText from "../Properties/FormattedText";
import { EventElementData } from "../../utils/base_element_types";
import { Element } from "../../utils/config";

interface EventProps {
  element: Element<EventElementData>;
  isEdit: boolean;
}

const Event: React.FC<EventProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.data as EventElementData;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardImg = useMemo(
    () =>
      elementProps.cardImg?.value
        ? `https://${process.env.NEXT_PUBLIC_CDN}/${elementProps.cardImg.value}`
        : undefined,
    [elementProps.cardImg]
  );

  const startDate = useMemo(() => {
    if (elementProps.start?.value) {
      return new Date(elementProps.start.value);
    }
    return;
  }, [elementProps.start]);

  const endDate = useMemo(() => {
    if (elementProps.end?.value) {
      return new Date(elementProps.end.value);
    }
    return;
  }, [elementProps.end]);

  // Return one of `live`, `upcoming`, `past`
  const eventStatus = useMemo(() => {
    const now = new Date();

    if (startDate && endDate) {
      if (
        now.getTime() > startDate.getTime() &&
        now.getTime() < endDate.getTime()
      ) {
        return "live";
      } else if (now.getTime() < startDate.getTime()) {
        return "upcoming";
      } else {
        return "past";
      }
    }

    if (startDate) {
      if (now.getTime() > startDate.getTime()) {
        return "live";
      } else if (now.getTime() < startDate.getTime()) {
        return "upcoming";
      } else {
        return "past";
      }
    }

    if (endDate) {
      if (now.getTime() < endDate.getTime()) {
        return "live";
      } else if (now.getTime() > endDate.getTime()) {
        return "past";
      } else {
        return "upcoming";
      }
    }
    return "live";
  }, [startDate, endDate]);

  return (
    <Box
      h={"6.5rem"}
      maxW={"full"}
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
      cursor="pointer"
      onClick={onOpen}
      textAlign="left"
    >
      <Flex p={3} h="100%" justifyContent="flex-start" direction="column">
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading
            size="md"
            color={cardImg ? "white" : "black"}
            pb={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            mr={2}
          >
            {elementProps.title.value}
          </Heading>
          {eventStatus === "live" && (
            <Badge colorScheme="red" fontSize="0.6rem">
              LIVE
            </Badge>
          )}
          {eventStatus === "past" && (
            <Badge colorScheme="gray" fontSize="0.6rem">
              FINISHED
            </Badge>
          )}
        </Flex>
        <Text color={cardImg ? "white" : "black"}>
          {startDate && format(startDate, "iii MMM d kk:mm")}{" "}
          {endDate &&
            (startDate ? "- " : "until ") +
              (startDate && startDate.toDateString() === endDate.toDateString()
                ? format(endDate, "kk:mm")
                : format(endDate, "iii MMM d kk:mm"))}
        </Text>
        {elementProps.location.value && (
          <Text color={cardImg ? "white" : "black"}>
            📍 {elementProps.location.value}
          </Text>
        )}
        <EventPopup
          elementId={props.element.id}
          title={elementProps.title.value}
          description={elementProps.description.value}
          startDate={startDate}
          endDate={endDate}
          cardImg={elementProps.cardImg.value}
          location={elementProps.location.value}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </Box>
  );
};

export default Event;

interface EventPopupProps {
  elementId: number;
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  cardImg?: string | JSX.Element;
  location?: string;
  isOpen: boolean;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = (props) => {
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      // @ts-ignore
      leastDestructiveRef={cancelAddRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.title}
          </AlertDialogHeader>
          <AlertDialogBody>
            <FormattedText
              isEdit={false}
              value={props.description || ""}
              onChange={() => {}}
            />
            {props.startDate && (
              <Text>
                {props.startDate && format(props.startDate, "iii MMM d kk:mm")}{" "}
                {props.endDate &&
                  "- " +
                    (props.startDate?.toDateString() ===
                    props.endDate.toDateString()
                      ? format(props.endDate, "kk:mm")
                      : format(props.endDate, "iii MMM d kk:mm"))}
              </Text>
            )}

            {props.location && <Text>📍 {props.location}</Text>}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelAddRef}
              variant="primary"
              onClick={props.onClose}
            >
              Exit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
