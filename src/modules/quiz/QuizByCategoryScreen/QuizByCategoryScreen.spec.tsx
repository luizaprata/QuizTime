import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import QuizByCategoryScreen from '.';
import { useNavigation } from '@react-navigation/native';
import useQuestionByCategoryApi from './useQuestionByCategoryApi';
import { ScoreSchema } from '../schema/Quiz.scheme';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';
import { useRoute } from '@react-navigation/native';

jest.mock('../schema/Quiz.scheme', () => {
  return { ScoreSchema: jest.fn() };
});

jest.mock('@react-navigation/native', () => {
  const navigate = jest.fn();
  const useNavigationMock = () => ({
    navigate,
  });

  return {
    useRoute: jest.fn().mockReturnValue({ params: { category: { id: 1 } } }),
    useNavigation: useNavigationMock,
    setOptions: jest.fn(),
  };
});

jest.mock('./useQuestionByCategoryApi', () => {
  let result = { isLoading: false, payload: [] };

  const mock = () => result;
  mock.setResult = (_result) => (result = _result);
  return mock;
});

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: jest.fn(),
    useNavigation: jest.fn().mockReturnValue({
      setOptions: jest.fn(),
    }),
  };
});

const useRouteMock = useRoute as jest.Mock;

const realm = {
  write: jest.fn(),
  create: jest.fn(),
};

describe('QuizByCategoryScreen', () => {
  let component: RenderAPI;

  beforeEach(() => {
    jest.useFakeTimers();
    useRouteMock.mockReturnValue({
      params: { workspace: { id: '123', name: 'name', scores: [] } },
    });
  });

  describe('Rendering', () => {
    test('SHOULD render error when errorMessage occurs from API', () => {
      useQuestionByCategoryApi.setResult({
        payload: null,
        isLoading: false,
        errorMessage: 'Ocorreu um erro',
        fetchData: jest.fn(),
      });
      component = render(
        <DatabaseContext.Provider value={{ realm }}>
          <QuizByCategoryScreen />
        </DatabaseContext.Provider>,
      );

      expect(component.getByText('Ocorreu um erro')).toBeDefined();
    });

    test('SHOULD render loading message when is loading the API', () => {
      useQuestionByCategoryApi.setResult({
        payload: null,
        isLoading: true,
        errorMessage: null,
        fetchData: jest.fn(),
      });
      component = render(<QuizByCategoryScreen />);

      expect(component.getByText('Carregando')).toBeDefined();
    });
  });
});
