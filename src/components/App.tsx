import React, {useEffect, useMemo} from 'react';
import Navbar from './Navbar';
import './App.css';
import {RecoilRoot, useRecoilState} from 'recoil';
import {appStateAtom, BlockState, errorAtom, userDetailsAtom, userReposAtom} from '../store/store';
import NeedLogin from './NeedLogin';
import {makeAccessToken} from '../services/github/auth';
import {errorToString} from '../utils';
import {Alert, ProgressBar} from 'react-bootstrap';
import {getUserInfo, UserInfo, UserRepo} from '../services/github/user';
import AuthorizedRoot from './AuthorizedRoot';

function App() {

  const [appState, setAppState] = useRecoilState(appStateAtom);
  const [,setUserDetails] = useRecoilState(userDetailsAtom);
  const [,setUserRepos] = useRecoilState(userReposAtom);
  const [error,setError] = useRecoilState(errorAtom);

  useEffect(() => {
    (async() => {
      try {
        setError(undefined);
        setAppState(BlockState.Loading);
        const access_token = await makeAccessToken();
        if (!access_token) {
          setAppState(BlockState.Unauthorized);
          return;
        }
        setUserDetails(await getUserInfo<UserInfo>('user', access_token));
        // TODO: Загружать остальные страницы, если у пользователя больше 100 репозиториев
        setUserRepos(await getUserInfo<UserRepo[]>('user/repos?affiliation=owner&sort=updated&per_page=100', access_token));
        setAppState(BlockState.UserSpecific);
      } catch (ex) {
        console.error(ex);
        setError('Ошибка загрузки: ' + errorToString(ex));
        setAppState(BlockState.UserUnknown);
      }
    })();
  }, [setAppState, setError, setUserDetails, setUserRepos]);

  const blockNoUser = useMemo(() => <div className="card">
    <div className="card-body p-4 text-center">
      <h3>Не удалось загрузить информацию о пользователе :(</h3>
    </div>
  </div>, []);

  return (
    <div className="container p-2">
      <Navbar />
      <div className="mb-2" />
      { error && <Alert variant="danger" onClose={() => setError(undefined)} dismissible>{error}</Alert> }
      { appState === BlockState.Loading && <div className="mt-4"><ProgressBar animated now={100} /></div> }
      { appState === BlockState.Unauthorized && <NeedLogin /> }
      { appState === BlockState.UserSpecific && <AuthorizedRoot /> }
      { appState === BlockState.UserUnknown && blockNoUser }
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
