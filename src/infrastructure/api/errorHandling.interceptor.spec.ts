import { ApiServerError } from './apiErrors/ApiServerError';
import { ApiUnknowError } from './apiErrors/ApiUnknowError';
import { ApiValidationError } from './apiErrors/ApiValidationError';
import errorHandlingInterceptor from './errorHandling.interceptor';

describe('errorHandling Interceptor', () => {
  test('SHOULD create a internal server error WHEN 500 ', async () => {
    let result = null;
    try {
      await errorHandlingInterceptor({ response: { status: 500 } });
    } catch (ex) {
      result = ex;
    }

    expect(result).toBeInstanceOf(ApiServerError);
  });

  test('SHOULD create a unknow server error WHEN not status ', async () => {
    let result = null;
    try {
      await errorHandlingInterceptor({ response: { status: 0 } });
    } catch (ex) {
      result = ex;
    }

    expect(result).toBeInstanceOf(ApiUnknowError);
  });

  test('SHOULD create a validation error WHEN 400 ', async () => {
    let result = null;
    try {
      await errorHandlingInterceptor({
        response: {
          status: 400,
          data: { title: 'foo', detail: 'baz' },
        },
      });
    } catch (ex) {
      result = ex;
    }

    expect(result).toBeInstanceOf(ApiValidationError);
    expect(result.detail).toBe('baz');
    expect(result.title).toBe('foo');
  });
});
