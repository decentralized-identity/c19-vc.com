import React from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


function AuthenticateWithCHAPI({ onDIDAuth }) {
    return (
        <Paper style={{ padding: '32px', textAlign: 'center' }}>
            <Typography variant="h6" style={{ marginBottom: '32px' }}>Authenticate Wallet</Typography>
            <Button variant={'contained'} onClick={async () => {
                // normally this would be contructed on a web server, and passed to the client, 
                // which would then pass it to CHAPI.
                // For this demo, we will contruct it on the client...
                const query = {
                    web: {
                        VerifiablePresentation: {
                            query: {
                                type: 'DIDAuth'
                            },
                            // a 128-bit randomly generated value encoded as a string (use a UUID);
                            // it will be digitally signed in the authentication proof
                            // that will be attached to the VerifiablePresentation response
                            challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                            // the domain that must be digitally signed in the authentication
                            // proof that will be attached to the VerifiablePresentation
                            // response, identifying the recipient
                            domain: window.location.host
                        }
                    }
                }
                const result = await navigator.credentials.get(query);
                onDIDAuth(result.data)
            }}>Authenticate</Button>
        </Paper >
    );
}

export default AuthenticateWithCHAPI;
