import React, {useEffect} from 'react';
import Navbar from './Navbar';
import './App.css';
import DebugTools from './DebugTools';
import {RecoilRoot, useRecoilState} from 'recoil';
import {appStateAtom, BlockState, errorAtom} from '../store/store';
import NeedLogin from './NeedLogin';
import {makeAccessToken} from '../services/github/auth';
import {errorToString, wait} from '../utils';
import {Alert, ProgressBar} from 'react-bootstrap';

function App() {

  const [appState, setAppState] = useRecoilState(appStateAtom);
  const [error,setError] = useRecoilState(errorAtom);

  useEffect(() => {
    (async() => {
      try {
        const oauth = await makeAccessToken();
        if (!oauth) return;
        console.log('code', oauth);
        setError(undefined);
        setAppState(BlockState.Loading);
        await wait(2500);
        throw new Error('Example?!');
        setAppState(BlockState.UserSpecific);
      } catch (ex) {
        console.error(ex);
        setError('Ошибка загрузки: ' + errorToString(ex));
        setAppState(BlockState.UserUnknown);
      }
    })();
  }, [setAppState, setError]);

  return (
    <div className="container p-2">
      <Navbar />
      <div className="mb-2" />
      { error && <Alert variant="danger" onClose={() => setError(undefined)} dismissible>{error}</Alert> }
      { appState === BlockState.Loading && <div className="mt-4"><ProgressBar animated now={100} /></div> }
      { appState === BlockState.Unauthorized && <NeedLogin /> }
      { false && <DebugTools /> }
    </div>
  );
}

export const AppRoot = () => {
  return (
  <RecoilRoot>
    <App />
  </RecoilRoot>
  )
}

export default AppRoot;
