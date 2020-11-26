import useApi from '@/hooks/useApi'
import URLS from '@/resources/urls'
import { useEffect } from 'react'
import { HomeSummary } from './Home.types'

export default function useHomeSummaryApi() {
  const {
    isLoading,
    errorMessage,
    payload,
    clearErrorMessage,
    fetchData,
  } = useApi<HomeSummary[]>('get', URLS.HOME.GET_ALL_CATEGORIES)

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  return { payload, isLoading, errorMessage, clearErrorMessage, fetchData }
}
