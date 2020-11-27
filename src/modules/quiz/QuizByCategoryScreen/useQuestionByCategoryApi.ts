import useApi from '@/hooks/useApi';
import URLS from '@/resources/urls';
import { useMemo } from 'react';
import {
  DifficultyEnum,
  QuestionResponse,
  QuestionTypeEnum,
} from '@/types/Trivia.types';

export default function useQuestionByCategoryApi(
  amount: number,
  type: QuestionTypeEnum,
  category: number,
  difficulty: DifficultyEnum,
) {
  const config = useMemo(() => {
    return { params: { amount, type, category, difficulty } };
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
