import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import FormattedText from "../../../Properties/FormattedText";

interface EventCardProps {
  title: string;
  elementId: number;
  description?: string;
  startDate?: string;
  endDate?: string;
  cardImg?: string | JSX.Element;
  location?: string;
}

const EventCard: React.FC<EventCardProps> = (props) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardImg = useMemo(
    () =>
      props.cardImg
        ? `https://${process.env.NEXT_PUBLIC_CDN}/${props.cardImg}`
        : undefined,
    [props.cardImg]
  );

  const startDate = useMemo(() => {
    if (props.startDate) {
      return new Date(props.startDate);
    }
    return;
  }, [props.startDate]);

  const endDate = useMemo(() => {
    if (props.endDate) {
      return new Date(props.endDate);
    }
    return;
  }, [props.endDate]);

  return (
    <Box
      // maxW="sm"
      h={24}
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
        <Heading
          size="md"
          color={cardImg ? "white" : "black"}
          pb={1}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {props.title}
        </Heading>
        {props.startDate && (
          <Text color={cardImg ? "white" : "black"}>
            {startDate && format(startDate, "iii MMM d kk:mm")}{" "}
            {endDate &&
              "- " +
                (startDate?.toDateString() === endDate.toDateString()
                  ? format(endDate, "kk:mm")
                  : format(endDate, "iii MMM d kk:mm"))}
          </Text>
        )}
        {props.location && (
          <Text color={cardImg ? "white" : "black"}>📍 {props.location}</Text>
        )}
        <EventPopup
          title={props.title}
          description={props.description}
          startDate={startDate}
          endDate={endDate}
          cardImg={props.cardImg}
          location={props.location}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </Box>
  );
};

export default EventCard;

interface EventPopupProps {
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
