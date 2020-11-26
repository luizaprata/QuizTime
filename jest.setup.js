import 'react-native-gesture-handler/jestSetup'
import 'react-native-screens/native-stack'
import 'react-native-gesture-handler/jestSetup'

global.window = {}
global.window = global

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock('react-native-screens/native-stack', () => ({
  createNativeStackNavigator: jest
    .fn()
    .mockReturnValue({ Navigator: '', Screen: '' }),
}))
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest
    .fn()
    .mockReturnValue({ Navigator: '', Screen: '' }),
}))

jest.mock('react-native-paper', () => {
  const RNP = jest.requireActual('react-native-paper')
  const { ActivityIndicator } = require('react-native')
  return { ...RNP, ActivityIndicator }
})
