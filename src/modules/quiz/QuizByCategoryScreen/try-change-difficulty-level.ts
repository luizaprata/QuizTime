import { DifficultyEnum } from '@/types/Trivia.types';

export type Difficulty = {
  current: DifficultyEnum;
  hitsCount: number;
};
export const DIFFICULTY_ORDER = [
  DifficultyEnum.easy,
  DifficultyEnum.medium,
  DifficultyEnum.hard,
];

const getDifficulty = (
  difficulty: Difficulty,
  newHits: number,
  tryPosition: number,
): Difficulty => {
  const idx = DIFFICULTY_ORDER.indexOf(difficulty.current);
  const levelCandidate = DIFFICULTY_ORDER[idx + tryPosition];
  return levelCandidate
    ? { current: levelCandidate, hitsCount: newHits }
    : { current: difficulty.current, hitsCount: newHits };
};

const tryChange = (difficulty: Difficulty, currentHits: number): Difficulty => {
  const changeLevel =
    currentHits !== difficulty.hitsCount && currentHits % 2 === 0;

  if (changeLevel) {
    return getDifficulty(
      difficulty,
      currentHits,
      currentHits < difficulty.hitsCount ? -1 : 1,
    );
  }

  return difficulty;
};

export default tryChange;
