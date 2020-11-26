import {AxiosError} from 'axios';
import {ApiError} from './ApiError';

export class ApiServerError extends ApiError {
  constructor(innerError: AxiosError) {
    super('', '', innerError);
  }
}
