import {atom} from 'recoil';
import {UserInfo} from '../services/github/user';

export interface UserDetails {
  avatar: string,
  username: string,
}

export enum BlockState {
  Unauthorized,
  Loading,
  UserUnknown,
  UserSpecific,
}

// TODO: Использовать Redux Toolkit?
export const appStateAtom = atom({key: 'appState', default: BlockState.Unauthorized});
export const userDetailsAtom = atom<UserInfo|undefined>({key: 'userDetails', default: undefined});
export const errorAtom = atom<string|JSX.Element|undefined>({key: 'error', default: undefined});
