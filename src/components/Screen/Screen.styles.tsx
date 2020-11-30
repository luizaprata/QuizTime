import styled from 'styled-components/native';
import colors from '@/resources/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ScreenArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.white};
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
`;
