
export const UrlAvatarMissing = 'https://github.githubassets.com/images/modules/logos_page/Octocat.png';

export const wait = (timeout: number) : Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
