import {api} from './';

describe('Api', () => {
  test('SHOULD return base url', () => {
    expect(api.defaults).toHaveProperty('baseURL', 'https://opentdb.com/');
  });

  test('SHOULD return correct header', () => {
    expect(api.defaults.headers).toHaveProperty(
      'client_id',
      `${CLIENT_ID_SENSEDIA_BFF}`,
    );
  });
});
