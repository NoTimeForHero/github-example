import {ajaxJSON} from '../../utils';

const API_ROOT = 'https://api.github.com/';

export interface UserInfo {
  id: number,
  login: string,
  avatar_url: string,
  email: string,
  company: string,
  location: string,
  bio: string,
  url: string
}

export const getUserInfo = async (access_token: string) : Promise<UserInfo> => {
  const ajax = await ajaxJSON(`${API_ROOT}user`, undefined, { method: 'GET', access_token });
  if (ajax.body.message) throw new Error(ajax.body.message);
  return ajax.body as UserInfo;
}
