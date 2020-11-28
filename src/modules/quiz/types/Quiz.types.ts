import { DifficultyEnum } from './Trivia.types';

type DifficultyScore = { hits: number; errors: number };

export type Score = {
  [DifficultyEnum.easy]: DifficultyScore;
  [DifficultyEnum.medium]: DifficultyScore;
  [DifficultyEnum.hard]: DifficultyScore;
};
