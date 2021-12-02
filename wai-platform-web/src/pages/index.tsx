import { Icon } from "@iconify/react";
import arrowForwardFill from "@iconify/icons-eva/arrow-forward-fill";
import {
  Grid,
  Box,
  Button,
  Typography,
  Container,
  styled,
} from "@mui/material";
import ParticleBackground from "../utils/particles/particleBackground";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(40),
}));

// ----------------------------------------------------------------------

const Index = () => {
  return (
    <RootStyle>
      <Container>
        <div>
          <Box
            sx={{
              maxWidth: 1000,
              margin: "auto",
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            <div>
              <Typography variant="h3" paragraph>
                Welcome to WarwickAI
              </Typography>
            </div>
            <Grid
              container
              justifyContent="center"
              spacing={8}
              direction="row"
              sx={{ paddingTop: 5 }}
            >
              <Grid item>
                <iframe
                  title="discord"
                  src="https://discord.com/widget?id=671438057408561182&theme=dark"
                  width="350"
                  height="500"
                  allowtransparency={true}
                  frameBorder="0"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </Grid>
              <Grid item>
                <Typography variant="h4">Projects</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Find more information here
                </Typography>
                <Button
                  sx={{ marginTop: "1em" }}
                  href="/projects"
                  size="large"
                  variant="contained"
                >
                  <Icon icon={arrowForwardFill} width={22} height={22} />
                </Button>

                <Typography variant="h4" sx={{ paddingTop: 8 }}>
                  Join the society
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Join us in the SU website
                </Typography>
                <Button
                  target="_blank"
                  sx={{ marginTop: "1em" }}
                  href="https://www.warwicksu.com/societies-sports/societies/57846/"
                  size="large"
                  variant="contained"
                >
                  <Icon icon={arrowForwardFill} width={22} height={22} />
                </Button>

                <Typography variant="h4" sx={{ paddingTop: 8 }}>
                  Everything else
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Find more information here
                </Typography>
                <Button
                  target="_blank"
                  sx={{ marginTop: "1em" }}
                  href="https://linktr.ee/warwickai"
                  size="large"
                  variant="contained"
                >
                  <Icon icon={arrowForwardFill} width={22} height={22} />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
      <ParticleBackground />
    </RootStyle>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
