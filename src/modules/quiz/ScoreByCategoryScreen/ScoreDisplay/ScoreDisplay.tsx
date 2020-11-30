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
            <ScoreContainer>
              <ScoreText>{difficultyName[item]}</ScoreText>
              <ScoreText>Acertos:{score[item].hits}</ScoreText>
              <ScoreText>Erros:{score[item].errors}</ScoreText>
            </ScoreContainer>
          );
        })}
      </ScoresContainer>
    </Container>
  );
};

export default ScoreDisplay;
