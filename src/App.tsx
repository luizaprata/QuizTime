import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigation from '.';
import { realm } from '@/infrastructure/database/database';
import colors from '@/resources/colors';

export default function App(): JSX.Element {
  return (
    <RealmProvider initialRealm={realm}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.chumbo200} />
      <MainNavigation />
    </RealmProvider>
  );
}
