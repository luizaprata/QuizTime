import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListOfCategoriesScreen from '@/modules/quiz/ListOfCategoriesScreen';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import QuizByCategoryScreen from './modules/quiz/QuizByCategoryScreen/QuizByCategoryScreen';

const Stack = createStackNavigator();

export function AppNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        testID="ListOfCategoriesNavigator"
        name={AppScreensEnum.ListOfCategories}
        component={ListOfCategoriesScreen}
      />
      <Stack.Screen
        testID="QuizByCategoryNavigator"
        name={AppScreensEnum.QuizByCategory}
        component={QuizByCategoryScreen}
      />
      <Stack.Screen
        testID="ScoreByCategoryNavigator"
        name={AppScreensEnum.ScoreByCategory}
        component={ScoreByCategoryScreen}
      />
    </Stack.Navigator>
  );
}

const SASTheme = {
  colors: {
    background: 'rgb(255, 255, 255)',
  },
};

export default function MainNavigation(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={SASTheme}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
