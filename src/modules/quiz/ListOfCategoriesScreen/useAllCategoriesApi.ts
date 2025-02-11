import useApi from '@/hooks/useApi';
import URLS from '@/resources/urls';
import { CategoriesResponse } from '@/modules/quiz/types/Trivia.types';
import { useEffect } from 'react';

export default function useAllCategoriesApi() {
  const {
    isLoading,
    errorMessage,
    payload,
    clearErrorMessage,
    fetchData,
  } = useApi<CategoriesResponse>('get', URLS.TRIVIA.GET_ALL_CATEGORIES);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  return { payload, isLoading, errorMessage, clearErrorMessage };
}
