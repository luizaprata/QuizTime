import React from 'react';
import { render, act, RenderAPI } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation, { AppNavigator } from './MainNavigation';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import ListOfCategoriesScreen from '@/modules/quiz/ListOfCategoriesScreen/ListOfCategoriesScreen';

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
        Promise.resolve();
      });
      const navigation = component.getByTestId('HomeNavigator');

      expect(navigation.props.name).toBe(AppScreensEnum.Home);
      expect(navigation.props.component).toEqual(ListOfCategoriesScreen);
    });
  });
});
