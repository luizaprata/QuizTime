import {AxiosError} from 'axios';

export class ApiError {
  constructor(
    public title: string,
    public detail: string,
    public innerError: AxiosError,
  ) {}
}
