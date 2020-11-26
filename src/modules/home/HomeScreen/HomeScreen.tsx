import {  StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
} from './HomeScreen.styles'
import colors from '@/resources/colors'
import useHomeSummaryApi from './useHomeSummaryApi'

const HomeScreen: React.FC = () => {
  const navigation = useNavigation()

  const {
    payload,
    isLoading,
    errorMessage,
    fetchData,
  } = useHomeSummaryApi()

  return (

        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.chumbo200}
          />
                  </Container>
  )
}

export default HomeScreen
