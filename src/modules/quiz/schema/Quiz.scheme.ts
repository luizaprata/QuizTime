const SCORE_SCHEMA = 'SCORE_SCHEMA';

const DifficultyScore = { hits: 'int', errors: 'int' };

export const ScoreScheme = {
  name: SCORE_SCHEMA,
  primaryKey: 'id',
  properties: {
    easy: DifficultyScore,
    medium: DifficultyScore,
    hard: DifficultyScore,
  },
};
