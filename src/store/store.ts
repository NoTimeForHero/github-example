import {atom} from 'recoil';

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

const defaultUserDetails : UserDetails = {
  avatar: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
  username: 'UserName'
};

// TODO: Использовать Redux Toolkit?
export const appStateAtom = atom({key: 'appState', default: BlockState.Unauthorized});
export const userDetailsAtom = atom<UserDetails>({key: 'userDetails', default: defaultUserDetails});
export const errorAtom = atom<string|JSX.Element|undefined>({key: 'error', default: undefined});
