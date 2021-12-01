import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Icon } from '@iconify/react';
import arrowForwardFill from '@iconify/icons-eva/arrow-forward-fill';
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
// particles
import ParticleBackground from '../utils/particles/particleBackground';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(40)
}));

// ----------------------------------------------------------------------

export default function Landing() {
  return (
    <RootStyle title="WarwickAI">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 1000, margin: 'auto', textAlign: 'center', paddingTop: 20 }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Welcome to WarwickAI
              </Typography>
            </motion.div>
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
                  allowtransparency="true"
                  frameBorder="0"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </Grid>
              <Grid item>
                <Typography variant="h4">Projects</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Find more information here</Typography>
                <Button sx={{ marginTop: '1em' }} href="/projects" size="large" variant="contained">
                  <Icon icon={arrowForwardFill} width={22} height={22} />
                </Button>

                <Typography variant="h4" sx={{ paddingTop: 8 }}>
                  Join the society
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Join us in the SU website</Typography>
                <Button
                  target="_blank"
                  sx={{ marginTop: '1em' }}
                  href="https://www.warwicksu.com/societies-sports/societies/57846/"
                  size="large"
                  variant="contained"
                >
                  <Icon icon={arrowForwardFill} width={22} height={22} />
                </Button>

                <Typography variant="h4" sx={{ paddingTop: 8 }}>
                  Everything else
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Find more information here</Typography>
                <Button
                  target="_blank"
                  sx={{ marginTop: '1em' }}
                  href="https://linktr.ee/warwickai"
                  size="large"
                  variant="contained"
                >
                  <Icon icon={arrowForwardFill} width={22} height={22} />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </MotionContainer>
      </Container>
      <ParticleBackground />
    </RootStyle>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Landing);