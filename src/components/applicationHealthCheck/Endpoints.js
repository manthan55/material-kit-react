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

function createData(endpoint, healthStatus, lastChecked) {
  return { endpoint, healthStatus, lastChecked };
}

const rows = [
  createData('http://google.com', true, '29th Sept. 5:00 PM'),
  createData('http://youtube.com', false, '29th Sept. 5:30 PM'),
  createData('http://facebook.com', true, '29th Sept. 5:30 PM')
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
                <TableCell align="right">Health Status</TableCell>
                <TableCell align="right">Last Checked</TableCell>
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
                  <TableCell align="right">
                    {row.healthStatus ? (
                      <SvgIcon sx={{ color: 'green' }}>
                        <Icon icon={checkmarkCircleFill} width={24} height={24} />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: 'red' }}>
                        <Icon icon={alertCircleFill} width={24} height={24} />
                      </SvgIcon>
                    )}
                  </TableCell>
                  <TableCell align="right">{row.lastChecked}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}
