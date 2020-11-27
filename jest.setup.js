import 'react-native-gesture-handler/jestSetup';
import 'react-native-screens/native-stack';
import 'react-native-gesture-handler/jestSetup';

global.window = {};
global.window = global;

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native-screens/native-stack', () => ({
  createNativeStackNavigator: jest
    .fn()
    .mockReturnValue({Navigator: '', Screen: ''}),
}));
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn().mockReturnValue({Navigator: '', Screen: ''}),
}));
