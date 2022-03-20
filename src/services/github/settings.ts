export const UrlAvatarMissing = 'https://github.githubassets.com/images/modules/logos_page/Octocat.png';

export const AuthProxyUrl = 'http://localhost:3001/';

export const Settings = {
  localStorageKey: 'GitHub_OAuth',
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  scope: ['user', 'repo'],
  redirect_uri: 'http://localhost:3000'
}
