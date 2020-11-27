import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import HomeScreen from './';
import {useNavigation} from '@react-navigation/native';

jest.mock('./useHomeSummaryApi', () => {
  let result = {isLoading: false, payload: []};

  const mock = () => result;
  mock.setResult = (_result) => (result = _result);
  return mock;
});

describe('HomeScreen', () => {
  let component: RenderAPI;
  let navigation;

  beforeEach(() => {
    jest.useFakeTimers();
    component = render(<HomeScreen />);
    navigation = useNavigation();
    navigation.navigate.mockReset();
  });

  describe('Rendering', () => {
    test('SHOULD render Pagamentos concluidos', () => {
      const button = component.queryByText('Pagamentos concluídos');
      expect(button).toBeDefined();
    });
  });
});
