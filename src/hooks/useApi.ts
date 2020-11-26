import {api} from '@/infrastructure/api';
import {ApiError} from '@/infrastructure/api/apiErrors/ApiError';
import {CancelError} from '@/infrastructure/api/apiErrors/CancelError';
import axios, {AxiosRequestConfig, CancelTokenSource} from 'axios';
import {useCallback, useRef, useState} from 'react';
const CancelToken = axios.CancelToken;

type ApiMethod = 'get' | 'post' | 'delete' | 'put';

export default function useApi<TResult>(
  method: ApiMethod,
  url: string,
  requestConfig?: AxiosRequestConfig,
) {
  const [payload, setPayload] = useState<TResult>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const tokenRef = useRef<CancelTokenSource>();

  const _fetch = useCallback(
    (body: unknown) => {
      tokenRef.current?.cancel();
      const source = CancelToken.source();
      tokenRef.current = source;

      const _config = requestConfig || {};
      _config.cancelToken = source.token;

      if (method === 'post') {
        return api.post<TResult>(url, body, _config);
      }
      if (method === 'put') {
        return api.put<TResult>(url, body, _config);
      }
      if (method === 'delete') {
        return api.delete<TResult>(url, _config);
      }
      return api.get<TResult>(url, _config);
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
        if (e instanceof CancelError === false) {
          setErrorMessage((e as ApiError).title);
          setIsLoading(false);
          setPayload(undefined);
        }
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
