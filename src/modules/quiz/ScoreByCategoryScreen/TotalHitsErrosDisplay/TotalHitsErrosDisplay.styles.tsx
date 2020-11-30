import colors from '@/resources/colors';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: center;
`;

export const ScoresContainer = styled.View`
  flex-direction: row;
  border-radius: 10;
  background-color: ${colors.chumbo400};
`;

export const ScoreContainer = styled.View`
  padding: 10px;
  margin: 10px;
`;

export const TextScore = styled.Text`
  text-align: center;
  padding: 3px;
`;
