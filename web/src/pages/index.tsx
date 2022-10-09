import {
  Box,
  Button,
  Text,
  Heading,
  Wrap,
  WrapItem,
  Flex,
  VStack,
} from "@chakra-ui/react";
import ParticleBackground from "../utils/particles/particleBackground";
import LogoOnlyPage from "../components/LogoOnlyPage";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useGetElementsQuery } from "../generated/graphql";
import { EventElementData } from "../utils/base_element_types";
import { Element } from "../utils/config";
import EventView from "../components/Elements/DatabaseView/EventView";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const EVENTS_LOOKAHEAD_DAYS = 14;
const EVENTS_LOOKAHEAD_MS = EVENTS_LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000;

const MAX_DATE = new Date(8640000000000000);
const MIN_DATE = new Date(-8640000000000000);

const Index = () => {
  const router = useRouter();

  const [discordInviteLink, setDiscordInviteLink] = useState("");
  const [discordPresence, setDiscordPresence] = useState<number | undefined>();
  const [discordLoading, setDiscordLoading] = useState(true);

  const [{ data: eventsQuery }] = useGetElementsQuery({
    variables: { type: "Event" },
  });

  const events = useMemo(() => {
    if (!eventsQuery?.getElements) {
      return [];
    }
    const events = eventsQuery?.getElements.filter((event) => {
      const startDate = event.data.start?.value
        ? new Date(event.data.start.value)
        : MIN_DATE;

      const endDate = event.data.end?.value
        ? new Date(event.data.end.value)
        : MAX_DATE;

      const now = new Date();

      let withinRange = false;

      // Check the event does not start futher than EVENTS_LOOKAHEAD_DAYS days in the future
      withinRange = startDate.getTime() - now.getTime() < EVENTS_LOOKAHEAD_MS;

      // Check the event does not end before now
      withinRange = withinRange && endDate.getTime() > now.getTime();

      return withinRange;
    });

    return events.sort((a, b) => {
      const aDate = a.data.start?.value
        ? new Date(a.data.start?.value)
        : MIN_DATE;

      const bDate = b.data.start?.value
        ? new Date(b.data.start?.value)
        : MAX_DATE;

      return aDate.getTime() - bDate.getTime();
    });
  }, [eventsQuery?.getElements]);

  useEffect(() => {
    const res = fetch(
      "https://discord.com/api/guilds/671438057408561182/widget.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setDiscordInviteLink(res.instant_invite);
        setDiscordPresence(res.presence_count);
        setDiscordLoading(false);
      });
  }, []);

  return (
    <LogoOnlyPage>
      <Box pt={10} maxWidth={700} margin="auto" textAlign="center">
        <Heading as="h3" size="lg">
          Welcome to WarwickAI
        </Heading>
        <Wrap justify="center" align="center" pt={10}>
          <WrapItem>
            <VStack>
              <Heading as="h4" size="md" mb={2}>
                What&apos;s On?
              </Heading>
              <Box
                width="full"
                maxWidth={96}
                maxHeight={72}
                overflowY="scroll"
                mb={4}
                className={"navbar"}
              >
                <EventView
                  rows={events as Element<EventElementData>[]}
                  isEdit={false}
                  addRow={() => {}}
                  removeRow={() => {}}
                  oneColumn={true}
                />
              </Box>
              <Box
                borderRadius="5px"
                bg="#202225"
                fontFamily="ABC Ginto Normal,Helvetica Neue,Helvetica,Arial,sans-serif"
                fontSize="14px"
                width="full"
              >
                <Flex
                  bg="hsl(235,calc(var(--saturation-factor, 1)*85.6%),64.7%)"
                  p="15px"
                  direction="row"
                  color="white"
                  alignItems="center"
                  borderTopRadius="5px"
                >
                  <a
                    href="https://discord.com?utm_source=Discord%20Widget&amp;utm_medium=Logo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62594fdd2eb6504fca0545cb_364fc8a0ee7fcebf47ca6ebd16ec12f1%20(1).svg"
                      width="124px"
                      height="34px"
                      alt="Discord Logo"
                    />
                  </a>
                  <span
                    style={{
                      textAlign: "right",
                      flex: 1,
                      marginLeft: "20px",
                      fontFamily: "inherit",
                    }}
                  >
                    <strong
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      {discordPresence}
                    </strong>{" "}
                    Members Online
                  </span>
                </Flex>
                <Box m="5px" marginLeft="auto" marginRight="0">
                  <a
                    href={discordInviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "white",
                      borderRadius: "5px",
                      backgroundColor: "hsla(0,0%,100%,.1)",
                      padding: "2px 10px",
                      fontFamily: "inherit",
                    }}
                  >
                    Join Discord
                  </a>
                </Box>
              </Box>
            </VStack>
          </WrapItem>

          <WrapItem>
            <Box minWidth={300}>
              <Heading as="h4" size="md">
                What is Warwick AI?
              </Heading>
              <Text size="sm" color="gray.600">
                Discover what we offer
              </Text>
              <Button
                mt={1}
                size="lg"
                variant="primary"
                onClick={() => {
                  router.push("/about");
                }}
              >
                <ArrowForwardIcon width={22} height={22} />
              </Button>

              <Heading pt={12} as="h4" size="md">
                Courses
              </Heading>
              <Text size="sm" color="gray.600">
                Find more information here
              </Text>
              <Button
                mt={1}
                size="lg"
                variant="primary"
                onClick={() => {
                  router.push("/courses");
                }}
              >
                <ArrowForwardIcon width={22} height={22} />
              </Button>

              <Heading pt={12} as="h4" size="md">
                Join the society
              </Heading>
              <Text size="sm" color="gray.600">
                Join us in the SU website
              </Text>
              <Button
                sx={{ marginTop: "1em" }}
                size="lg"
                variant="primary"
                onClick={() => {
                  router.push(
                    "https://www.warwicksu.com/societies-sports/societies/57846/"
                  );
                }}
              >
                <ArrowForwardIcon width={22} height={22} />
              </Button>
            </Box>
          </WrapItem>
        </Wrap>
      </Box>
      <ParticleBackground />
    </LogoOnlyPage>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
