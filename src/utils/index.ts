
export const wait = (timeout: number) : Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export interface AjaxParams {
  method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD',
  proxy?: string,
  access_token?: string,
}

export const ajaxJSON = async (url: string, data: any, params : AjaxParams = { method: 'POST' }) => {
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (params.access_token) headers['Authorization'] = `token ${params.access_token}`;
  const response = await fetch(`${params.proxy??''}${url}`, {
    method: 'POST',
    headers,
    body: ['POST','PUT','PATCH'].includes(params.method) ? JSON.stringify(data) : undefined
  });
  const body = await response.json();
  return { response, body };
}

export const errorToString = (ex: unknown): string => {
  if (ex instanceof Error) return ex.message;
  if (typeof ex !== 'string') return JSON.stringify(ex);
  return ex;
}
