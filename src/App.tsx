import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigation from '.';
import { realm } from '@/infrastructure/database/database';
import colors from '@/resources/colors';
import DatabaseProvider from '@/infrastructure/database/DatabaseProvider';

export default function App(): JSX.Element {
  return (
    <DatabaseProvider initialRealm={realm}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.chumbo200} />
      <MainNavigation />
    </DatabaseProvider>
  );
}
