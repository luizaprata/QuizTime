import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import ListOfCategoriesScreen from '.';
import { useNavigation } from '@react-navigation/native';
import useAllCategoriesApi from './useAllCategoriesApi';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';

jest.mock('@react-navigation/native', () => {
  const navigate = jest.fn();
  const useNavigationMock = () => ({
    navigate,
  });

  return {
    useNavigation: useNavigationMock,
  };
});

jest.mock('@/hooks/useRealmQuery', () => {
  return jest.fn().mockReturnValue([
    { id: '123', name: 'category1', scores: [] },
    { id: '321', name: 'category2', scores: [] },
  ]);
});

jest.mock('./useAllCategoriesApi', () => {
  let result = { isLoading: false, payload: [] };

  const mock = () => result;
  mock.setResult = (_result) => (result = _result);
  return mock;
});

const realm = {
  write: jest.fn(),
  create: jest.fn(),
};

describe('ListOfCategoriesScreen', () => {
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
      component = render(
        <DatabaseContext.Provider value={{ realm }}>
          <ListOfCategoriesScreen />
        </DatabaseContext.Provider>,
      );

      expect(component.getByText('category1')).toBeDefined();
      expect(component.getByText('category2')).toBeDefined();
    });

    test('SHOULD render error when errorMessage occurs from API', () => {
      useAllCategoriesApi.setResult({
        payload: null,
        isLoading: false,
        errorMessage: 'Ocorreu um erro',
      });
      component = render(
        <DatabaseContext.Provider value={{ realm }}>
          <ListOfCategoriesScreen />
        </DatabaseContext.Provider>,
      );

      expect(component.getByText('Ocorreu um erro')).toBeDefined();
    });

    test('SHOULD render loading message when is loading the API', () => {
      useAllCategoriesApi.setResult({
        payload: null,
        isLoading: true,
        errorMessage: null,
      });
      component = render(
        <DatabaseContext.Provider value={{ realm }}>
          <ListOfCategoriesScreen />
        </DatabaseContext.Provider>,
      );

      expect(component.getByText('Carregando')).toBeDefined();
    });
  });
});
