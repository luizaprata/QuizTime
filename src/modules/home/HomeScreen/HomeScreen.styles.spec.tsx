import React from 'react'
import { render } from '@testing-library/react-native'
import {
  Container,
} from './HomeScreen.styles'

describe('HomeScreen.styles', () => {
  test('THEN Container SHOULD match with snapshot', () => {
    const container = render(<Container />).asJSON()
    expect(container).toMatchSnapshot()
  })
  
})
