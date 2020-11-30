import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonContainer } from './ListOfCategoriesScreen.styles';

describe('ListOfCategoriesScreen.styles', () => {
  test('THEN Container SHOULD match with snapshot', () => {
    const tree = renderer.create(<ButtonContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
