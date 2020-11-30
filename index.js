import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export default function Main() {
  return <App />;
}
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Main));
