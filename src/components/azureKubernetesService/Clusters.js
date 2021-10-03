// material
import { Grid, Container } from '@mui/material';
// import { AppWeeklySales } from '../components/_dashboard/app';
// components
import Cluster from './Cluster';

// ----------------------------------------------------------------------

// Make API call to /getAks endpoint & return the list of clusters
function getAKSClusters() {
  const clusters = ['Prod cluster', 'Dev cluster', 'QA cluster'];
  return clusters;
}

export default function Clusters(props) {
  const clusters = getAKSClusters();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {clusters.map((cluster) => (
          <Grid
            key={cluster}
            item
            xs={12}
            sm={6}
            md={3}
            onClick={() => {
              props.onClusterSelect(cluster);
            }}
          >
            <Cluster title={cluster} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
