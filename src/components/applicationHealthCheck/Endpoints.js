import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Icons
import { Icon } from '@iconify/react';
import { SvgIcon, Card, CardHeader, Box } from '@mui/material';
import checkmarkCircleFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';

function createData(endpoint, status, response, statusCode, expectedStatusCode) {
  return { endpoint, status, response, statusCode, expectedStatusCode };
}

const rows = [
  // Status
  // true = Running
  // false = Error
  createData('http://google.com', true, 'some response string', 201, 201),
  createData('http://youtube.com', false, 'some response string', 500, 201),
  createData('http://facebook.com', true, 'some response string', 200, 200)
];

export default function Endpoints() {
  return (
    <Card>
      <CardHeader title="Endpoints Status" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Endpoint</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Response</TableCell>
                <TableCell align="right">Status Code</TableCell>
                <TableCell align="right">Expected Status Code</TableCell>
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
                    {row.status ? (
                      <SvgIcon sx={{ color: 'green' }}>
                        <Icon icon={checkmarkCircleFill} width={24} height={24} />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: 'red' }}>
                        <Icon icon={alertCircleFill} width={24} height={24} />
                      </SvgIcon>
                    )}
                  </TableCell>
                  <TableCell align="right">{row.response}</TableCell>
                  <TableCell align="right">{row.statusCode}</TableCell>
                  <TableCell align="right">{row.expectedStatusCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}
