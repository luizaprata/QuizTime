import useApi from '@/hooks/useApi';
import URLS from '@/resources/urls';
import {useEffect} from 'react';
import {CategoriesResponse} from './types/Trivia.types';

export default function useAllCategoriesApi() {
  const {
    isLoading,
    errorMessage,
    payload,
    clearErrorMessage,
    fetchData,
  } = useApi<CategoriesResponse>('get', URLS.TRIVIA.GET_ALL_CATEGORIES);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {payload, isLoading, errorMessage, clearErrorMessage};
}
