import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import HomeScreen from './';
import { useNavigation } from '@react-navigation/native';
import useAllCategoriesApi from './useAllCategoriesApi';

jest.mock('@react-navigation/native', () => {
  const navigate = jest.fn();
  const useNavigationMock = () => ({
    navigate,
  });

  return {
    useNavigation: useNavigationMock,
  };
});

jest.mock('./useAllCategoriesApi', () => {
  let result = { isLoading: false, payload: [] };

  const mock = () => result;
  mock.setResult = (_result) => (result = _result);
  return mock;
});

describe('HomeScreen', () => {
  let component: RenderAPI;
  let navigation;

  beforeEach(() => {
    jest.useFakeTimers();
    navigation = useNavigation();
    navigation.navigate.mockReset();
  });

  describe('Rendering', () => {
    test('SHOULD render Category buttons when payload is fetched from API', () => {
      useAllCategoriesApi.setResult({
        payload: {
          trivia_categories: [
            { id: 1, name: 'category1' },
            { id: 2, name: 'category2' },
          ],
        },
        isLoading: false,
        errorMessage: null,
      });
      component = render(<HomeScreen />);

      expect(component.getByText('category1')).toBeDefined();
      expect(component.getByText('category2')).toBeDefined();
    });

    test('SHOULD render error when errorMessage occurs from API', () => {
      useAllCategoriesApi.setResult({
        payload: null,
        isLoading: false,
        errorMessage: 'Ocorreu um erro',
      });
      component = render(<HomeScreen />);

      expect(component.getByText('Ocorreu um erro')).toBeDefined();
    });

    test('SHOULD render loading message when is loading the API', () => {
      useAllCategoriesApi.setResult({
        payload: null,
        isLoading: true,
        errorMessage: null,
      });
      component = render(<HomeScreen />);

      expect(component.getByText('Carregando')).toBeDefined();
    });
  });
});
