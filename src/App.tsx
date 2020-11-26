import React from 'react';
import {StatusBar} from 'react-native';
import MainNavigation from '.';
import colors from './resources/colors';

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.chumbo200} />
      <MainNavigation />
    </>
  );
}
