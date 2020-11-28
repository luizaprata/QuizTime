import React from 'react';
import { render, act, RenderAPI } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation, { AppNavigator } from './MainNavigation';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import QuizByCategoryScreen from '@/modules/quiz/QuizByCategoryScreen';
import ScoreByCategoryScreen from '@/modules/quiz/ScoreByCategoryScreen';
import ListOfCategoriesScreen from '@/modules/quiz/ListOfCategoriesScreen';

jest.mock('@/modules/quiz/QuizByCategoryScreen', () => {
  return null;
});
jest.mock('@/modules/quiz/ScoreByCategoryScreen', () => {
  return null;
});
jest.mock('@/modules/quiz/ListOfCategoriesScreen', () => {
  return null;
});

describe('MainNavigation', () => {
  let component: RenderAPI;

  beforeEach(() => {
    jest.useFakeTimers();

    render(<MainNavigation />);
  });

  describe('AppNavigator', () => {
    test('THEN it SHOULD have ListOfCategoriesScreen navigator', async () => {
      component = render(
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>,
      );

      await act(async () => {
        await Promise.resolve();
      });
      const navigation = component.getByTestId('ListOfCategoriesNavigator');
      expect(navigation.props.name).toBe(AppScreensEnum.ListOfCategories);
      expect(navigation.props.component).toEqual(ListOfCategoriesScreen);
    });

    test('THEN it SHOULD have QuizByCategoryScreen navigator', async () => {
      component = render(
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>,
      );

      await act(async () => {
        await Promise.resolve();
      });
      const navigation = component.getByTestId('QuizByCategoryNavigator');
      expect(navigation.props.name).toBe(AppScreensEnum.QuizByCategory);
      expect(navigation.props.component).toEqual(QuizByCategoryScreen);
    });

    test('THEN it SHOULD have ScoreByCategoryScreen navigator', async () => {
      component = render(
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>,
      );

      await act(async () => {
        await Promise.resolve();
      });
      const navigation = component.getByTestId('ScoreByCategoryNavigator');
      expect(navigation.props.name).toBe(AppScreensEnum.ScoreByCategory);
      expect(navigation.props.component).toEqual(ScoreByCategoryScreen);
    });
  });
});
