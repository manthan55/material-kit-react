import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

// Icons
import { Icon } from '@iconify/react';
import { SvgIcon, Card, Box, CardHeader, Stack, Button } from '@mui/material';
import checkmarkCircleFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import deleteIcon from '@iconify/icons-ic/delete';
import editIcon from '@iconify/icons-ic/edit';

function createData(endpoint, status, response, statusCode, expectedStatusCode, email) {
  return { endpoint, status, response, statusCode, expectedStatusCode, email };
}

const rows = [
  // Status
  // true = Running
  // false = Error
  createData('google', true, 'some response string', 201, 201, 'team@app1.com'),
  createData('youtube', false, 'some response string', 500, 201, 'team@app2.com'),
  createData('facebook', true, 'some response string', 200, 200, 'team@app3.com')
];

export default function Endpoints() {
  const navigate = useNavigate();

  const DeleteEndpoint = (endpointName) => {
    // Make API call to delete the endpoint
    console.log(endpointName);
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <CardHeader title="Endpoints Status" />
        <Box sx={{ pr: 2, pt: 2, pb: 2 }}>
          <Button
            variant="contained"
            href="/dashboard/application-health-check/add-edit-endpoint"
            startIcon={<Icon icon={plusFill} />}
          >
            Add Endpoint
          </Button>
        </Box>
      </Stack>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Endpoint</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Response</TableCell>
                <TableCell>Status Code</TableCell>
                <TableCell>Expected Status Code</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.endpoint}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.endpoint}
                  </TableCell>
                  <TableCell align="center">
                    {row.active ? (
                      <SvgIcon sx={{ color: 'green' }}>
                        <Icon icon={checkmarkCircleFill} width={24} height={24} />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: 'red' }}>
                        <Icon icon={alertCircleFill} width={24} height={24} />
                      </SvgIcon>
                    )}
                  </TableCell>
                  <TableCell>{row.response}</TableCell>
                  <TableCell>{row.statusCode}</TableCell>
                  <TableCell>{row.expectedStatusCode}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <SvgIcon
                      sx={{ color: 'red' }}
                      onClick={() => {
                        DeleteEndpoint(row.endpoint);
                      }}
                    >
                      <Icon icon={deleteIcon} width={24} height={24} />
                    </SvgIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}
