// material
import { Grid, Container } from '@mui/material';

// icons
import cloud from '@iconify/icons-ant-design/cloud';

// components
import ColorBox from '../common/ColorBox';

// ----------------------------------------------------------------------

// Make API call to /getAks endpoint & return the list of clusters
function getAKSClusters() {
  const clusters = ['Prod cluster', 'Dev cluster', 'QA cluster'];
  return clusters;
}

export default function Clusters(props) {
  const clusters = getAKSClusters();

  // Make API call to /aks/getNamespaces endpoint & return the count of namespaces
  const getNamepaceCountOfCluster = (clusterName) => {
    const namespaceCount = 5;

    return `${namespaceCount} Namespace(s)`;
  };

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
            <ColorBox title={cluster} icon={cloud} subtitle={getNamepaceCountOfCluster(cluster)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
