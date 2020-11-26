import {AxiosError} from 'axios';
import {ApiServerError} from './apiErrors/ApiServerError';
import {ApiValidationError} from './apiErrors/ApiValidationError';
import {ApiUnknowError} from './apiErrors/ApiUnknowError';

type ApiErrorResponse = {
  title: string;
  detail: string;
};

const defaultErrorValue: ApiErrorResponse = {
  title: 'Ops!',
  detail: 'Ocorreu um erro inexperado',
};

export default function errorHandlingInterceptor(
  error: AxiosError<ApiErrorResponse>,
) {
  const code = Number(error?.response?.status) || 0;
  if (code >= 500) {
    return Promise.reject(new ApiServerError(error));
  }

  if (code >= 400) {
    const data = error?.response?.data || defaultErrorValue;
    return Promise.reject(
      new ApiValidationError(data.title, data.detail, error),
    );
  }

  return Promise.reject(new ApiUnknowError(error));
}
