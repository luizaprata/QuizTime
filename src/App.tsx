import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigation from '.';
import { realm, seedDatabase } from '@/infrastructure/database/database';
import colors from '@/resources/colors';
import RealmProvider from '@/infrastructure/database/DatabaseProvider';

seedDatabase();

export default function App(): JSX.Element {
  return (
    <RealmProvider initialRealm={realm}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.chumbo200} />
      <MainNavigation />
    </RealmProvider>
  );
}
