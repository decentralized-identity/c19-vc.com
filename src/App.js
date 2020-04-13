import React from 'react';
import * as chapi from 'credential-handler-polyfill';
import GithubCorner from 'react-github-corner';


import Theme from './components/Theme'
import './App.css';

import AuthenticateWithCHAPI from './components/AuthenticateWithCHAPI';
import ReceiveCredential from './components/ReceiveCredential'


function App() {

  const [state, setState] = React.useState({
    DIDAuth: null
  })

  const onDIDAuth = (vp) => {
    setState({
      DIDAuth: vp
    })
  }

  React.useEffect(() => {
    (async () => {
      try {
        await chapi.loadOnce();
      } catch (e) {
        console.error('Error in loadOnce:', e);
      }
    })();
  }, [])


  return (
    <Theme>
      <div className="App">
        <GithubCorner bannerColor={'#594aa8'} href="https://github.com/decentralized-identity/c19-vc.com" />
        <div style={{ maxWidth: '512px', margin: 'auto', paddingTop: '5%', }}>
          <img src={'/dif-logo-white-small.png'} alt="transmute logo" style={{ width: '50%', margin: 'auto', display: 'block', padding: '32px 0px' }} />
          {state.DIDAuth ? <ReceiveCredential DIDAuth={state.DIDAuth} /> : <AuthenticateWithCHAPI onDIDAuth={onDIDAuth} />}
        </div>
      </div>
    </Theme>
  );
}

export default App;
