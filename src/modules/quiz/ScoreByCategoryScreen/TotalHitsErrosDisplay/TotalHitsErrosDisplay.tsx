import React from 'react';
import { DifficultyEnum } from '../../types/Trivia.types';
import {
  Container,
  ScoreContainer,
  ScoresContainer,
  TextScore,
} from './TotalHitsErrosDisplay.styles';
import { DIFFICULTY_ORDER } from '../../QuizByCategoryScreen/quiz-status';
import { DifficultyScore } from '../../types/Quiz.types';

type Props = {
  score: Record<DifficultyEnum, DifficultyScore>;
};

const sumarizeErros = (score: Record<DifficultyEnum, DifficultyScore>) => {
  const values = DIFFICULTY_ORDER.map((item) => score[item].errors);
  return values.reduce((a, b) => a + b, 0);
};

const sumarizeHits = (score: Record<DifficultyEnum, DifficultyScore>) => {
  const values = DIFFICULTY_ORDER.map((item) => score[item].hits);
  return values.reduce((a, b) => a + b, 0);
};

const TotalHitsErrosDisplay: React.FC<Props> = ({ score }: Props) => {
  return (
    <Container>
      <ScoresContainer>
        <ScoreContainer>
          <TextScore>acertos</TextScore>
          <TextScore testID="TotalHits">{sumarizeHits(score)}</TextScore>
        </ScoreContainer>
        <ScoreContainer>
          <TextScore>erros</TextScore>
          <TextScore testID="TotalErros">{sumarizeErros(score)}</TextScore>
        </ScoreContainer>
      </ScoresContainer>
    </Container>
  );
};

export default TotalHitsErrosDisplay;
