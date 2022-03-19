import {ajaxJSON, wait} from '../../utils';

const API_ROOT = 'https://api.github.com/';

// TODO: Добавить в кэш TTL
const cachedAjax = async <T = any>(url: string, access_token: string) => {
  await wait(200);
  const cacheKey = `cache_${url}`;
  const cache = JSON.parse(localStorage.getItem(cacheKey) ?? 'null');
  if (cache) return cache as T;
  const ajax = await ajaxJSON(`${API_ROOT}${url}`, undefined, { method: 'GET', access_token });
  const body = ajax.body;
  localStorage.setItem(cacheKey, JSON.stringify(body));
  return body as T;
}

export interface UserInfo {
  id: number,
  login: string,
  avatar_url: string,
  email: string,
  company: string,
  location: string,
  blog: string,
  twitter_username: string,
  bio: string,
  url: string
}

export const getUserInfo = async (access_token: string) : Promise<UserInfo> => {
  const ajax = await cachedAjax('user', access_token);
  if (ajax.message) throw new Error(ajax.message);
  return ajax as UserInfo;
}
