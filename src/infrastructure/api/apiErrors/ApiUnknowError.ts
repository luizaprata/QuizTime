import {AxiosError} from 'axios';
import {ApiError} from './ApiError';

export class ApiUnknowError extends ApiError {
  constructor(innerError: AxiosError) {
    super('', ''), innerError);
  }
}
