import useApi from '@/hooks/useApi';
import URLS from '@/resources/urls';
import { useMemo } from 'react';
import {
  DifficultyEnum,
  QuestionResponse,
  QuestionTypeEnum,
} from '@/modules/quiz/types/Trivia.types';
import { IScore } from '../types/Quiz.types';

export default function useQuestionByCategoryApi(
  amount: number,
  type: QuestionTypeEnum,
  difficulty: DifficultyEnum,
  category?: IScore,
) {
  const config = useMemo(() => {
    return { params: { amount, type, difficulty, category: category?.id } };
  }, [amount, type, category, difficulty]);

  const {
    isLoading,
    errorMessage,
    payload,
    clearErrorMessage,
    fetchData,
  } = useApi<QuestionResponse>('get', URLS.TRIVIA.GET_QUESTION, config);

  return {
    payload,
    isLoading,
    errorMessage,
    fetchData,
    clearErrorMessage,
  };
}
