// material
import {
  Box,
  Container,
  Typography,
  Stack,
  Checkbox,
  TextField,
  Button,
  Chip,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function AddEditEndpoint() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');
  const [active, setActive] = useState(true);
  const [successStatus, setSuccessStatus] = useState(200);
  const [currentDistributionEmail, setCurrentDistributionEmail] = useState('');
  const [distributionEmails, setDistributionEmails] = useState([]);
  const [currentDistributionTeamsChannel, setCurrentDistributionTeamsChannel] = useState('');
  const [distributionTeamsChannels, setDistributionTeamsChannels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    setIsSubmitting(true);

    const data = {
      name,
      description,
      url,
      active,
      successStatus,
      distributionEmails,
      distributionTeamsChannels
    };
    console.log(data);

    // Send above data to API to add a new endpoint

    // Once API call is successfull, stop the loading animation
    setIsSubmitting(false);
    // And navigate to application-health-check
    navigate('/dashboard/application-health-check', { replace: true });
  };

  const addDistributionEmail = () => {
    setDistributionEmails([...distributionEmails, currentDistributionEmail]);
    setCurrentDistributionEmail('');
  };

  const deleteDistributionEmail = (email) => {
    const updatedDLE = distributionEmails.slice();
    const index = updatedDLE.indexOf(email);
    if (index > -1) {
      updatedDLE.splice(index, 1);
      setDistributionEmails(updatedDLE);
    }
  };

  const addDistributionTeamsChannel = () => {
    setDistributionTeamsChannels([...distributionTeamsChannels, currentDistributionTeamsChannel]);
    setCurrentDistributionTeamsChannel('');
  };

  const deleteDistributionTeamsChannel = (teamsChannel) => {
    const updatedDLTC = distributionTeamsChannels.slice();
    const index = updatedDLTC.indexOf(teamsChannel);
    if (index > -1) {
      updatedDLTC.splice(index, 1);
      setDistributionTeamsChannels(updatedDLTC);
    }
  };

  return (
    <Page title="Add/Edit Endpoint">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Add/Edit Endpoint</Typography>
        </Box>
        {/* <FormikProvider value={formik}> */}
        {/* <Form autoComplete="off" noValidate> */}
        <Box>
          <Stack spacing={3}>
            <TextField
              sx={{ width: 500 }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              // {...getFieldProps('name')}
              label="Name"
              value={name}
              // error={Boolean(touched.name && errors.name)}
              // helperText={touched.name && errors.name}
            />
            <TextField
              sx={{ width: 500 }}
              label="Description"
              // {...getFieldProps('description')}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              // error={Boolean(touched.description && errors.description)}
              // helperText={touched.description && errors.description}
            />
            <TextField
              sx={{ width: 500 }}
              label="URL"
              value={url}
              onChange={(e) => {
                setURL(e.target.value);
              }}
              // {...getFieldProps('url')}
              // error={Boolean(touched.url && errors.url)}
              // helperText={touched.url && errors.url}
            />
            <FormControlLabel
              sx={{ width: 500 }}
              control={
                <Checkbox
                  // {...getFieldProps('active')}
                  checked={active}
                  onChange={(e) => {
                    setActive(e.target.checked);
                  }}
                />
              }
              label="Active"
            />
            <TextField
              sx={{ width: 500 }}
              label="Success Status"
              value={successStatus}
              onChange={(e) => {
                setSuccessStatus(e.target.value);
              }}
              // {...getFieldProps('successStatus')}
              // error={Boolean(touched.successStatus && errors.successStatus)}
              // helperText={touched.successStatus && errors.successStatus}
            />
            <Box>
              <Stack direction="row" alignItems="center" sx={{ my: 2, width: 500 }}>
                <TextField
                  fullWidth
                  label="Distribution Email"
                  value={currentDistributionEmail}
                  onChange={(e) => {
                    setCurrentDistributionEmail(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    addDistributionEmail();
                  }}
                >
                  Add
                </Button>
              </Stack>
              <Stack direction="row" spacing={1}>
                {distributionEmails.map((distributionEmail) => (
                  <Chip
                    key={distributionEmail}
                    label={distributionEmail}
                    color="primary"
                    onDelete={() => {
                      deleteDistributionEmail(distributionEmail);
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" sx={{ my: 2, width: 500 }}>
                <TextField
                  fullWidth
                  label="Distribution Teams Channels"
                  value={currentDistributionTeamsChannel}
                  onChange={(e) => {
                    setCurrentDistributionTeamsChannel(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    addDistributionTeamsChannel();
                  }}
                >
                  Add
                </Button>
              </Stack>
              <Stack direction="row" spacing={1}>
                {distributionTeamsChannels.map((distributionTeamsChannel) => (
                  <Chip
                    key={distributionTeamsChannel}
                    label={distributionTeamsChannel}
                    color="primary"
                    onDelete={() => {
                      deleteDistributionTeamsChannel(distributionTeamsChannel);
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                /> */}
          </Stack>
          <LoadingButton
            sx={{ mt: 5, width: 500 }}
            fullWidth
            size="large"
            onClick={onSubmit}
            variant="contained"
            loading={isSubmitting}
          >
            Add
          </LoadingButton>
        </Box>
        {/* </Form> */}
        {/* </FormikProvider> */}
      </Container>
    </Page>
  );
}
