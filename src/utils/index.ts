
export const wait = (timeout: number) : Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export const awaitWithTimeout = async <T>(timeout: number, message: string, waitFirst: Promise<T>) : Promise<T> => {
  const rejectWait : Promise<void> = new Promise((_, reject) => setTimeout(() => reject(message), timeout));
  return new Promise<T>((resolve, reject) =>
    Promise
      .race([waitFirst, rejectWait])
      .then((value) => value && resolve(value as T))
      .catch(reject));
}

export type HttpMethod = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD';

interface AjaxProps {
  method?: HttpMethod,
  timeout?: number,
  proxy?: string|undefined,
  access_token?: string|undefined,
}

export const ajaxJSON = async (
  url: string,
  data: any,
  props: AjaxProps
) => {
  const { access_token, proxy = '' } = props;
  const { timeout = 5000, method = 'POST' } = props;
  console.warn('AJAX Request', url, props.method);
  const body = ['POST','PUT','PATCH'].includes(method) ? JSON.stringify(data) : undefined;
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (access_token) headers['Authorization'] = `token ${access_token}`;
  const responsePromise = fetch(`${proxy}${url}`, { method, headers, body });
  const response = await awaitWithTimeout(timeout, 'Превышено время ожидания запроса', responsePromise);
  const responseBody = await response.json();
  return { response, body: responseBody };
}

export const errorToString = (ex: unknown): string => {
  if (ex instanceof Error) return ex.message;
  if (typeof ex !== 'string') return JSON.stringify(ex);
  return ex;
}
