import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { DIFFICULTY_ORDER } from '../quiz-status';
import { DifficultyEnum } from '../../types/Trivia.types';
import colors from '@/resources/colors';
import { Container, IconContainer, TextStatus } from './DifficultyStars.styles';

const getDifficultyName = (difficulty: DifficultyEnum) => {
  switch (difficulty) {
    case 'hard':
      return 'Difícil';
    case 'medium':
      return 'Moderado';
    default:
      return 'Fácil';
  }
};

type Props = {
  currentDifficulty: DifficultyEnum;
};

const DifficultyStars: React.FC<Props> = ({ currentDifficulty }: Props) => {
  let reachedDifficulty = false;

  return (
    <Container>
      <IconContainer>
        {DIFFICULTY_ORDER.map((item) => {
          const icon = (
            <Icon
              testID={`DifficultyStar${item}`}
              key={item}
              name="star"
              color={reachedDifficulty ? colors.chumbo700 : colors.black}
              size={30}
            />
          );
          if (currentDifficulty === item) {
            reachedDifficulty = true;
          }
          return icon;
        })}
      </IconContainer>
      <TextStatus>{getDifficultyName(currentDifficulty)}</TextStatus>
    </Container>
  );
};

export default DifficultyStars;
