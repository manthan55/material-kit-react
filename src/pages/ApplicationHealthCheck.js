// material
import { Box, Grid, Container, Typography } from '@mui/material';
import HCStatusGraph from '../components/applicationHealthCheck/HCStatusGraph';
import Endpoints from '../components/applicationHealthCheck/Endpoints';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function ApplicationHealthCheck() {
  return (
    <Page title="Application Health Check">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Application Health Check</Typography>
        </Box>
        <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
            <HCStatusGraph />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Endpoints />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
