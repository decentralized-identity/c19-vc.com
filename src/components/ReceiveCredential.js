import React from 'react';

import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField'
import Snackbar from './Snackbar';

import Example from './Example'

import forms from './Example/forms';

import { getVpForAddToWalletType } from '../help';

const options = [
  {
    value: 'ImmunoglobulinDetectionTestCard',
    label: 'Immunoglobulin Detection Test Card',
  },
];

function ReceiveCredential(props) {

  const [state, setState] = React.useState({
    addToWalletType: 'ImmunoglobulinDetectionTestCard',
    tmui: {}
  });

  const handleChange = event => {
    setState({ ...state, addToWalletType: event.target.value });
  };

  return (
    <Paper style={{ padding: '32px' }}>
      <Snackbar tmui={state.tmui} doSetTmuiProp={(prop) => {
        setState({
          ...state,
          tmui: {
            ...state.tmui,
            ...prop
          }
        })
      }} />
      <Typography variant="h6" style={{ marginBottom: '32px' }}>Add to Wallet</Typography>

      <TextField
        id="outlined-select-addToWalletType"
        style={{ marginBottom: '16px' }}
        select
        fullWidth
        label="Type"
        value={state.addToWalletType}
        onChange={handleChange}
        variant="outlined"
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Example {...props} {...forms[state.addToWalletType]} onSubmit={async (formData) => {
        formData.issuer = formData.verificationMethod.split('#')[0];
        const vp = await getVpForAddToWalletType(state.addToWalletType, formData)
        const webCredentialWrapper = new global.WebCredential(vp.type, vp);
        // Use Credential Handler API to store
        const result = await navigator.credentials.store(webCredentialWrapper);
        console.log('Result of receiving via store() request:', result);
        setState({
          ...state,
          tmui: {
            ...state.tmui,
            snackBarMessage: {
              open: true,
              variant: 'success',
              message: 'Credential stored in wallet.',
              vertical: 'top',
              horizontal: 'right',
              autoHideDuration: 20 * 1000,
            },
          }
        }
        );
      }} />
    </Paper >
  );
}

export default ReceiveCredential;
