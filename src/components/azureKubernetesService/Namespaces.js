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
import { useState, useEffect } from 'react';
// import { AppWeeklySales } from '../components/_dashboard/app';
// components
import Cluster from './Cluster';

// ----------------------------------------------------------------------

// Make API call to /getAks endpoint & return the list of clusters
function getAKSClusters() {
  const clusters = ['Prod cluster', 'Dev cluster', 'QA cluster'];
  return clusters;
}

// Make API call to /getNamespaces endpoint with the clusterName as input & return the list of clusters
function getAKSClusterNamespaces(clusterName) {
  const namespaces = ['default', 'system', 'kubedns'];
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
      {namespaces !== null && namespaces.map((namespace) => <p>{namespace}</p>)}
      {/* {namespaces !== null && console.log(namespaces)} */}
    </Container>
  );
}
