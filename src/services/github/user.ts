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

export interface UserRepo__Author {
  id: number,
  login: string,
  avatar_url: string,
  html_url: string
}

export interface UserRepo {
  id: number,
  name: string,
  full_name: string,
  language: string,
  visibility: string,
  owner: UserRepo__Author,
  private: boolean,
  created_at: string,
  updated_at: string,
  html_url: string
}

export const getUserInfo = async <T>(url: string, access_token: string) : Promise<T> => {
  const ajax = await cachedAjax(url, access_token);
  if (ajax.message) throw new Error(ajax.message);
  return ajax as T;
}
