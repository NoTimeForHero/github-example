import {ajaxJSON} from '../../utils';
import {AuthProxyUrl, Settings} from './settings';

export const getGithubUrl = () => {
  const client_id = Settings.client_id;
  const scope = Settings.scope.join('%20');
  const redirect_uri = Settings.redirect_uri;
  const params = {scope, client_id, redirect_uri};
  const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  return `https://github.com/login/oauth/authorize?${query}`;
}

export const makeAccessToken = async () => {
  const code = document.location.search.match(/code=([^&]+)/)?.[1];
  if (!code) return localStorage.getItem(Settings.localStorageKey);
  // Заменяем в любом случае
  window.history.replaceState({additionalInformation: 'Updated the URL with JS'}, document.title, '/');
  const ajax = await ajaxJSON('https://github.com/login/oauth/access_token', {
    code,
    client_id: Settings.client_id,
    client_secret: Settings.client_secret
  }, { proxy: AuthProxyUrl });
  const { access_token, error_description } = ajax.body;
  if (error_description) throw new Error(error_description);
  console.warn('Saving GitHub OAuth code to LocalStorage!', access_token);
  localStorage.setItem(Settings.localStorageKey, access_token);
  return access_token;
}

export const doLogout = () => {
  localStorage.clear();
  document.location = '/';
}

