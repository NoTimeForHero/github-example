
export const UrlAvatarMissing = 'https://github.githubassets.com/images/modules/logos_page/Octocat.png';

export const wait = (timeout: number) : Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
export const getGithubUrl = () => {
  const client_id = '***REMOVED***';
  const scope = ['user', 'repo'].join('%20');
  const redirect_uri = 'http://localhost:3000/';
  const params = {scope, client_id, redirect_uri};
  const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  return `https://github.com/login/oauth/authorize?${query}`;
}

const authCode_keyName = 'GitHub_OAuth';

export const makeAuthCode = () => {
  const code = document.location.search.match(/code=([^&]+)/)?.[1];
  if (!code) return localStorage.getItem(authCode_keyName);
  localStorage.setItem(authCode_keyName, code);
  window.history.replaceState({additionalInformation: 'Updated the URL with JS'}, document.title, '/');
  console.warn('Saving GitHub OAuth code to LocalStorage!', code);
  return code;
}

export const clearAuthCode = () => localStorage.removeItem(authCode_keyName);

export const errorToString = (ex: unknown): string => {
  if (ex instanceof Error) return ex.message;
  if (typeof ex !== 'string') return JSON.stringify(ex);
  return ex;
}
