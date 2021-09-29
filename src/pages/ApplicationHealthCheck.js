// material
import { Box, Grid, Container, Typography } from '@mui/material';
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
          <Endpoints />
        </Grid>
      </Container>
    </Page>
  );
}
