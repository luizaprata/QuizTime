import React from 'react'
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

Icon.loadFont()
export default function Main() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <App />
    </PaperProvider>
  )
}
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Main))
