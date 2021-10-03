// material
import { Box, Grid, Container, Typography, Tabs, Tab } from '@mui/material';
// import { AppWeeklySales } from '../components/_dashboard/app';
// components
import { useState } from 'react';
import Namespaces from '../components/azureKubernetesService/Namespaces';
import Clusters from '../components/azureKubernetesService/Clusters';
import Page from '../components/Page';
import Cluster from '../components/azureKubernetesService/Cluster';

// ----------------------------------------------------------------------

export default function AzureKubernetesService() {
  // Tab handling vars & methods
  const tabNames = ['Clusters', 'Namespaces', 'Pods'];
  const [currentTab, setCurrentTab] = useState(tabNames[0]);
  const [selectedCluster, setSelectedCluster] = useState(null);

  const onClusterSelect = (clusterName) => {
    setSelectedCluster(clusterName);
    setCurrentTab(tabNames[1]);
  };

  return (
    <Page title="Azure Kubernetes Service">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Azure Kubernetes Service</Typography>
        </Box>
        <Box sx={{ pb: 5, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => {
              setCurrentTab(newValue);
            }}
            aria-label="basic tabs example"
          >
            {tabNames.map((tabName) => (
              <Tab value={tabName} label={tabName} />
            ))}
          </Tabs>
        </Box>
        <Grid container spacing={3}>
          {currentTab === 'Clusters' ? (
            <>
              <Grid item xs={12} sm={12} md={12}>
                <Clusters onClusterSelect={onClusterSelect} />
              </Grid>
            </>
          ) : null}
          {currentTab === 'Namespaces' ? (
            <>
              <Grid item xs={12} sm={12} md={12}>
                <Namespaces selectedCluster={selectedCluster} />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </Page>
  );
}
