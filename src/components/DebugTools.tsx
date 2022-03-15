import { useRecoilState} from 'recoil';
import {appStateAtom, BlockState, userDetailsAtom} from '../store/store';
import {FormControl} from 'react-bootstrap';

type ReactUseState<T> = [
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
];

const makeRadio = <TValue, >(group: string, header: JSX.Element | string, value: TValue, useState: ReactUseState<TValue>) => {
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" name={group}
             onChange={() => useState[1](value)} checked={value === useState[0]} />
      <label className="form-check-label" onClick={() => useState[1](value)}>
        {header}
      </label>
    </div>
  );
};

export const DebugTools = () => {

  const appState =  useRecoilState(appStateAtom);
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);

  return (<div className="pt-3 row">
    <div className="col-4">
      <h4>AppState:</h4>
      {makeRadio('main', 'Unauthorized', BlockState.Unauthorized, appState)}
      {makeRadio('main', 'Loading', BlockState.Loading, appState)}
      {makeRadio('main', 'UserUnknown', BlockState.UserUnknown, appState)}
      {makeRadio('main', 'UserSpecific', BlockState.UserSpecific, appState)}
    </div>
    <div className="col-4">
      <h4>UserDetails:</h4>
      { appState[0] !== BlockState.UserSpecific && <span className="text-warning">BlockState.UserSpecific</span>}
      <FormControl className="my-2" placeholder="Avatar"
                   onChange={(ev) => setUserDetails({...userDetails, avatar: ev.target.value})}
                   disabled={appState[0] !== BlockState.UserSpecific} value={userDetails?.avatar} />
      <FormControl className="my-2" placeholder="Username"
                   onChange={(ev) => setUserDetails({...userDetails, username: ev.target.value})}
                   disabled={appState[0] !== BlockState.UserSpecific} value={userDetails?.username} />
    </div>
  </div>);
}

export default DebugTools;
