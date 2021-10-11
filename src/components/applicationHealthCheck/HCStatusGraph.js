import { useEffect, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../charts';

// ----------------------------------------------------------------------

function getStatusHistoryForEndpoint(endpointName) {
  // Make API call here to get the status history of the given endpoint name with appropriate params for from, to, etc

  // Mock response from API
  const statusHistoryResponse_API1 = {
    statuses: [
      {
        healthStatus: 'Initializing',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:02:41.766+00:00',
        responseTime: 97
      },
      {
        healthStatus: 'Initializing',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:03:11.679+00:00',
        responseTime: 8
      },
      {
        healthStatus: 'Unhealthy',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:03:41.680+00:00',
        responseTime: 20
      }
    ],
    currentPage: 0,
    totalPages: 10,
    totalItems: 28
  };
  const statusHistoryResponse_API2 = {
    statuses: [
      {
        healthStatus: 'Initializing',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:02:41.766+00:00',
        responseTime: 5
      },
      {
        healthStatus: 'Initializing',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:03:11.679+00:00',
        responseTime: 20
      },
      {
        healthStatus: 'Unhealthy',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:03:41.680+00:00',
        responseTime: 15
      }
    ],
    currentPage: 0,
    totalPages: 10,
    totalItems: 28
  };
  const statusHistoryResponse_API3 = {
    statuses: [
      {
        healthStatus: 'Initializing',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:02:41.766+00:00',
        responseTime: 40
      },
      {
        healthStatus: 'Initializing',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:03:11.679+00:00',
        responseTime: 65
      },
      {
        healthStatus: 'Unhealthy',
        statusCode: 0,
        statusType: 'FailedToConnect',
        timestamp: '2021-10-04T21:03:41.680+00:00',
        responseTime: 77
      }
    ],
    currentPage: 0,
    totalPages: 10,
    totalItems: 28
  };

  if (endpointName === apiEndpoints[0]) {
    return statusHistoryResponse_API1.statuses;
  } else if (endpointName === apiEndpoints[1]) {
    return statusHistoryResponse_API2.statuses;
  } else {
    return statusHistoryResponse_API3.statuses;
  }
}

const apiEndpoints = ['API1', 'API2', 'API3'];

export default function HCStatusGraph() {
  // Variable to store chart data temporarily until its set in state variable
  const chartDataTemp = [];
  const [chartData, setChartData] = useState([]);
  const [chartXLabels, setChartXLabels] = useState([]);
  // State variable to avoid rendering chart until the data has be loaded & set into respective state variables
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    formChartData();
  }, []);

  const formChartData = () => {
    // Loop for x no of endpoints, each iteration of loop will form one line for one endpoint status history
    for (let i = 0; i < 3; i++) {
      // Call the function which makes API here to get api status history
      const statusHistory = getStatusHistoryForEndpoint(apiEndpoints[i]);

      // We need to create X axis labels only once, thus calling this function only when i is 0
      if (i === 0) formXLabels(statusHistory);

      // Forming actual chart data for each endpoint by looping over status history of that endpoint
      formChartDataForAPI(apiEndpoints[i], statusHistory);
    }
    // Once we are done looping, set the chartDataTemp variable to the state varibale
    setChartData(chartDataTemp);
    // and enable chart rendering
    setIsLoaded(true);
  };

  const formXLabels = (statusHistory) => {
    const timestamps = [];
    statusHistory.forEach((status) => {
      timestamps.push(status.timestamp);
    });
    // console.log("timestamps", timestamps)
    setChartXLabels(timestamps);
  };

  const formChartDataForAPI = (endpointName, statusHistory) => {
    const chartDataForAPI = {
      name: endpointName,
      type: 'area',
      data: []
    };
    statusHistory.forEach((status) => {
      chartDataForAPI.data.push(status.responseTime);
    });
    // console.log(endpointName+" chartDataForAPI", chartDataForAPI)
    chartDataTemp.push(chartDataForAPI);
  };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [1, 1, 1] },
    fill: { type: ['gradient', 'gradient', 'gradient'] },
    labels: chartXLabels,
    xaxis: { type: 'timestamp' }
  });

  return (
    <Card>
      <CardHeader title="Endpoint Health Status" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {isLoaded ? (
          <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
        ) : (
          <p>Loading</p>
        )}
      </Box>
    </Card>
  );
}
