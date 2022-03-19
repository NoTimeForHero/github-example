
export const wait = (timeout: number) : Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export const ajaxJSON = async (url: string, data: any, { proxy } : { proxy?: string } = {}) => {
  const response = await fetch(`${proxy}https://github.com/login/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data)
  });
  const body = await response.json();
  return { response, body };
}

export const errorToString = (ex: unknown): string => {
  if (ex instanceof Error) return ex.message;
  if (typeof ex !== 'string') return JSON.stringify(ex);
  return ex;
}
