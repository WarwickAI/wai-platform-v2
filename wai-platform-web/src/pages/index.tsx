import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  Container,
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ParticleBackground from "../utils/particles/particleBackground";
import LogoOnlyPage from "../components/LogoOnlyPage";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <LogoOnlyPage>
      <Box pt={10} maxWidth={700} margin="auto" textAlign="center">
        <Heading as="h3" size="lg">
          Welcome to WarwickAI
        </Heading>
        <Wrap justify="center" align="center" pt={10}>
          <WrapItem>
            <iframe
              title="discord"
              src="https://discord.com/widget?id=671438057408561182&theme=dark"
              width="350"
              height="500"
              allowtransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          </WrapItem>

          <WrapItem>
            <Box minWidth={300}>
              <Heading as="h4" size="md">
                Projects
              </Heading>
              <Text size="sm" color="gray.600">
                Find more information here
              </Text>
              <Button
                mt={1}
                size="lg"
                variant="primary"
                onClick={() => {
                  router.push("/projects");
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
                target="_blank"
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

              <Heading pt={12} as="h4" size="md">
                Everything else
              </Heading>
              <Text size="sm" color="gray.600">
                Find more information here
              </Text>
              <Button
                target="_blank"
                sx={{ marginTop: "1em" }}
                size="lg"
                variant="primary"
                onClick={() => {
                  router.push("https://linktr.ee/warwickai");
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
