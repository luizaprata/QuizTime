import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import QuizByCategoryScreen from '.';
import useQuestionByCategoryApi from './useQuestionByCategoryApi';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';
import { useRoute } from '@react-navigation/native';
import {
  MAX_AMOUNT_QUESTION,
  MAX_ANSWERS,
  QUESTION_TYPE,
} from './QuizByCategoryScreen';
import { QuestionTypeEnum } from '../types/Trivia.types';

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

jest.mock('@/hooks/useRealmQuery', () => {
  return jest.fn().mockReturnValue([
    { id: 12, name: 'category1', scores: [] },
    { id: 13, name: 'category2', scores: [] },
  ]);
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

  describe('Config', () => {
    test('Total of answers SHOULD be 10', () => {
      expect(MAX_ANSWERS).toBe(10);
    });
    test('Question type SHOULD be multiple', () => {
      expect(QUESTION_TYPE).toBe('multiple');
    });
    test('Total amount of questions in the screen SHOULD be 1', () => {
      expect(MAX_AMOUNT_QUESTION).toBe(1);
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
      component = render(
        <DatabaseContext.Provider value={{ realm }}>
          <QuizByCategoryScreen />
        </DatabaseContext.Provider>,
      );

      expect(component.getByText('Carregando')).toBeDefined();
    });

    describe('WHEN  payload is fetched', () => {
      beforeAll(() => {
        useQuestionByCategoryApi.setResult({
          payload: {
            response_code: 0,
            results: [
              {
                category: 'Politics',
                type: 'multiple',
                difficulty: 'easy',
                question:
                  'Which former US president was nicknamed after he refused to shoot a defenseless black bear?',
                correct_answer: 'Theodore Roosevelt',
                incorrect_answers: [
                  'Woodrow Wilson',
                  'James F. Fielder',
                  'Andrew Jackson',
                ],
              },
            ],
          },
          isLoading: false,
          errorMessage: null,
          fetchData: jest.fn(),
        });
      });

      test('SHOULD render button of multiple answers ', () => {
        component = render(
          <DatabaseContext.Provider value={{ realm }}>
            <QuizByCategoryScreen />
          </DatabaseContext.Provider>,
        );

        expect(component.queryAllByTestId('AnswersIncorrect')).toHaveLength(3);
        expect(component.queryAllByTestId('AnswersCorrect')).toHaveLength(1);
      });

      test('SHOULD render question', () => {
        component = render(
          <DatabaseContext.Provider value={{ realm }}>
            <QuizByCategoryScreen />
          </DatabaseContext.Provider>,
        );

        expect(component.getByTestId('Question').children).toEqual([
          'Which former US president was nicknamed after he refused to shoot a defenseless black bear?',
        ]);
      });
    });
  });
});
