import {api} from '@/infrastructure/api';
import {ApiError} from '@/infrastructure/api/apiErrors/ApiError';
import {AxiosRequestConfig} from 'axios';
import {useCallback, useState} from 'react';

type ApiMethod = 'get' | 'post' | 'delete' | 'put';

export default function useApi<TResult>(
  method: ApiMethod,
  url: string,
  requestConfig?: AxiosRequestConfig,
) {
  const [payload, setPayload] = useState<TResult>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const _fetch = useCallback(
    (body: unknown) => {
      if (method === 'post') {
        return api.post<TResult>(url, body, requestConfig);
      }
      if (method === 'put') {
        return api.put<TResult>(url, body, requestConfig);
      }
      if (method === 'delete') {
        return api.delete<TResult>(url, requestConfig);
      }
      return api.get<TResult>(url, requestConfig);
    },
    [method, url, requestConfig],
  );

  const request = useCallback(
    async (body: unknown = null) => {
      try {
        setIsLoading(true);
        const {data} = await _fetch(body);
        setPayload(data);
        setIsLoading(false);
        setErrorMessage(null);
      } catch (e) {
        setErrorMessage((e as ApiError).title);
        setIsLoading(false);
        setPayload(undefined);
      }
    },
    [_fetch],
  );

  return {
    payload,
    isLoading,
    errorMessage,
    clearErrorMessage: () => setErrorMessage(null),
    fetchData: request,
  };
}
