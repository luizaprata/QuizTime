import React from 'react';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import QuizByCategoryScreen from '.';
import useQuestionByCategoryApi from './useQuestionByCategoryApi';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';
import { useRoute } from '@react-navigation/native';
import {
  MAX_AMOUNT_QUESTION,
  MAX_ANSWERS,
  QUESTION_TYPE,
} from './QuizByCategoryScreen';
import { useNavigation } from '@react-navigation/native';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import { ScoreSchema } from '../schema/Quiz.scheme';

jest.mock('@react-navigation/native', () => {
  const useNavigationMock = jest.fn().mockReturnValue({
    navigate: jest.fn(),
  });
  return {
    useRoute: jest.fn().mockReturnValue({ params: { category: { id: 1 } } }),
    useNavigation: useNavigationMock,
    setOptions: jest.fn(),
  };
});

jest.mock('cuid', () => {
  return jest.fn().mockReturnValue('aaa');
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

const useRouteMock = useRoute as jest.Mock;

const realm = {
  write: (fn) => fn(),
  create: jest.fn(),
};

const findAndHitMultipleTimes = async (
  component: RenderAPI,
  times: number,
  buttonTestId: string,
) => {
  for (let i = 0; i < times; i++) {
    const button = component.getByTestId(buttonTestId);

    await act(async () => {
      fireEvent.press(button);
      await Promise.resolve();
    });
  }
};

describe('QuizByCategoryScreen', () => {
  let component: RenderAPI;
  let navigation;

  beforeEach(() => {
    jest.useFakeTimers();
    useRouteMock.mockReturnValue({
      params: { workspace: { id: '123', name: 'name', scores: [] } },
    });

    navigation = useNavigation();
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

  describe('Behavior', () => {
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

    test('WHEN student aswered 10 question SHOULD save score to local storage', async () => {
      component = render(
        <DatabaseContext.Provider value={{ realm }}>
          <QuizByCategoryScreen />
        </DatabaseContext.Provider>,
      );

      await findAndHitMultipleTimes(component, 10, 'AnswersCorrect');

      expect(realm.create).toHaveBeenCalledTimes(3);
      expect(realm.create).toHaveBeenCalledWith(ScoreSchema.name, {
        difficulty: 'easy',
        errors: 0,
        hits: 2,
        id: 'aaa',
        workspace: {
          id: 12,
          name: 'category1',
          scores: [],
        },
      });
      expect(realm.create).toHaveBeenCalledWith(ScoreSchema.name, {
        difficulty: 'medium',
        errors: 0,
        hits: 2,
        id: 'aaa',
        workspace: {
          id: 12,
          name: 'category1',
          scores: [],
        },
      });
      expect(realm.create).toHaveBeenCalledWith(ScoreSchema.name, {
        difficulty: 'hard',
        errors: 0,
        hits: 6,
        id: 'aaa',
        workspace: {
          id: 12,
          name: 'category1',
          scores: [],
        },
      });
    });

    test('WHEN student aswered 10 question SHOULD navigate to score screen', async () => {
      component = render(
        <DatabaseContext.Provider value={{ realm }}>
          <QuizByCategoryScreen />
        </DatabaseContext.Provider>,
      );

      await findAndHitMultipleTimes(component, 10, 'AnswersCorrect');

      expect(navigation.navigate).toHaveBeenCalledWith(
        AppScreensEnum.ScoreByCategory,
        {
          score: {
            easy: { hits: 2, errors: 0 },
            medium: { hits: 2, errors: 0 },
            hard: { hits: 6, errors: 0 },
          },
        },
      );
    });
  });
});
