import { useState, useEffect } from 'react';

// material
import {
  Grid,
  Container,
  Select,
  MenuItem,
  Alert,
  Box,
  FormControl,
  InputLabel
} from '@mui/material';

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

// Make API call to /getNamespaces endpoint with the clusterName as input & return the list of clusters
function getAKSClusterNamespaces(clusterName) {
  const namespaces = ['default', 'system', 'kubedns', 'metrics'];
  return namespaces;
}

export default function Namespaces(props) {
  const clusters = getAKSClusters();

  const [cluster, setCluster] = useState('--SELECT--');
  const [namespaces, setNamespaces] = useState(null);

  useEffect(() => {
    if (props.selectedCluster !== null) {
      setCluster(props.selectedCluster);
      setNamespaces(getAKSClusterNamespaces(props.selectedCluster));
    }
  }, []);

  const handleClusterSelect = (event) => {
    setCluster(event.target.value);
    setNamespaces(getAKSClusterNamespaces(event.target.value));
  };

  // Make API call to /aks/getPods endpoint & return the count of pods
  const getPodCountOfNamespace = (namespace) => {
    const podCount = 5;

    return `${podCount} Pod(s)`;
  };

  return (
    <Container maxWidth="xl">
      <FormControl>
        <InputLabel>Cluster</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cluster}
          label="Cluster"
          onChange={handleClusterSelect}
        >
          <MenuItem value="--SELECT--">--SELECT--</MenuItem>
          {clusters.map((cluster) => (
            <MenuItem key={cluster} value={cluster}>
              {cluster}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {cluster === '--SELECT--' ? (
        <div style={{ margin: '20px 0px' }}>
          <Alert severity="error">Please select a cluster to view the namespaces within it</Alert>
        </div>
      ) : null}
      <Grid style={{ marginTop: '10px' }} container spacing={3}>
        {namespaces !== null &&
          namespaces.map((namespace) => (
            <Grid
              key={namespace}
              item
              xs={12}
              sm={6}
              md={3}
              onClick={() => {
                // props.onClusterSelect(cluster);
              }}
            >
              <ColorBox
                title={namespace}
                icon={cloud}
                subtitle={getPodCountOfNamespace(namespace)}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
