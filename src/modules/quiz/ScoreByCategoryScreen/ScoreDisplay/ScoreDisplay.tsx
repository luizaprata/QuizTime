import React from 'react';
import { DifficultyEnum } from '../../types/Trivia.types';
import {
  Container,
  ScoreContainer,
  ScoresContainer,
  ScoreText,
} from './ScoreDisplay.styles';
import { DIFFICULTY_ORDER } from '../../QuizByCategoryScreen/quiz-status';
import { DifficultyScore } from '../../types/Quiz.types';

const difficultyName: Record<DifficultyEnum, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

type Props = {
  score: Record<DifficultyEnum, DifficultyScore>;
};

const ScoreDisplay: React.FC<Props> = ({ score }: Props) => {
  return (
    <Container>
      <ScoresContainer>
        {DIFFICULTY_ORDER.map((item) => {
          return (
            <ScoreContainer key={item} testID={`Score ${item}`}>
              <ScoreText>{difficultyName[item]}</ScoreText>
              <ScoreText testID={`Score hit ${item}`}>
                Acertos:{score[item].hits}
              </ScoreText>
              <ScoreText testID={`Score error ${item}`}>
                Erros:{score[item].errors}
              </ScoreText>
            </ScoreContainer>
          );
        })}
      </ScoresContainer>
    </Container>
  );
};

export default ScoreDisplay;
