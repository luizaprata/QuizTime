import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonContainer } from './HomeScreen.styles';

describe('HomeScreen.styles', () => {
  test('THEN Container SHOULD match with snapshot', () => {
    const tree = renderer.create(<ButtonContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
