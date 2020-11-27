import { api } from './';

describe('Api', () => {
  test('SHOULD return base url', () => {
    expect(api.defaults).toHaveProperty('baseURL', 'https://opentdb.com/');
  });
});
