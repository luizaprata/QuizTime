import React from 'react'
import {
  act,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react-native'
import HomeScreen from './'
import { useNavigation } from '@react-navigation/native'

jest.mock('@/hooks/useUserToken', () => {
  const clearToken = jest.fn()

  return () => ({
    clearToken,
  })
})

jest.mock('./useHomeSummaryApi', () => {
  let result = { isLoading: false, payload: [] }

  const mock = () => result
  mock.setResult = (_result) => (result = _result)
  return mock
})

describe('HomeScreen', () => {
  let component: RenderResult
  let navigation

  beforeEach(() => {
    jest.useFakeTimers();
    component = render(<HomeScreen />)
    navigation = useNavigation()
    navigation.navigate.mockReset()
  })

  describe('Rendering', () => {
    test('SHOULD render Pagamentos concluidos', () => {
      const button = component.queryByText('Pagamentos concluídos')
      expect(button).toBeDefined()
    })
    
  })

  describe('Behavior', () => {
    test('SHOULD navigate to Pagamentos concluídos', () => {
      const button = component.getByTestId('Botão Pagamentos concluídos')

      act(() => {
        fireEvent.press(button)
      })

      expect(navigation.navigate).toHaveBeenCalledWith('Payments')
    })
    
  })
})
