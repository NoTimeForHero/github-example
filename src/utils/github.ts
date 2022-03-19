import {ajaxJSON} from './index';

export const UrlAvatarMissing = 'https://github.githubassets.com/images/modules/logos_page/Octocat.png';

const GitHub_Settings = {
  localStorageKey: 'GitHub_OAuth',
  client_id: '***REMOVED***',
  client_secret: '***REMOVED***',
  scope: ['user', 'repo'],
  redirect_uri: 'http://localhost:3000'
}

export const getGithubUrl = () => {
  const client_id = GitHub_Settings.client_id;
  const scope = GitHub_Settings.scope.join('%20');
  const redirect_uri = GitHub_Settings.redirect_uri;
  const params = {scope, client_id, redirect_uri};
  const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  return `https://github.com/login/oauth/authorize?${query}`;
}

export const makeAuthCode = async () => {
  const code = document.location.search.match(/code=([^&]+)/)?.[1];
  if (!code) return localStorage.getItem(GitHub_Settings.localStorageKey);
  // Заменяем в любом случае
  window.history.replaceState({additionalInformation: 'Updated the URL with JS'}, document.title, '/');
  const ajax = await ajaxJSON('https://github.com/login/oauth/access_token', {
    code,
    client_id: GitHub_Settings.client_id,
    client_secret: GitHub_Settings.client_secret
  }, { proxy: 'http://localhost:3001/'});
  const { access_token, error_description } = ajax.body;
  if (error_description) throw new Error(error_description);
  console.warn('Saving GitHub OAuth code to LocalStorage!', access_token);
  localStorage.setItem(GitHub_Settings.localStorageKey, access_token);
  return access_token;
}

export const clearAuthCode = () => localStorage.removeItem(GitHub_Settings.localStorageKey);

export const errorToString = (ex: unknown): string => {
  if (ex instanceof Error) return ex.message;
  if (typeof ex !== 'string') return JSON.stringify(ex);
  return ex;
}
