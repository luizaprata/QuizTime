import { DifficultyEnum } from '@/types/Trivia.types';

export type QuizStatus = {
  difficulty: DifficultyEnum;
  straightPoints: number;
};
export const DIFFICULTY_ORDER = [
  DifficultyEnum.easy,
  DifficultyEnum.medium,
  DifficultyEnum.hard,
];

const MAX_STRAIGHT = 2;

const getDifficulty = (
  quizStatus: QuizStatus,
  isCorrect: boolean,
): QuizStatus => {
  const idx = DIFFICULTY_ORDER.indexOf(quizStatus.difficulty);
  const levelCandidate = DIFFICULTY_ORDER[idx + (isCorrect ? 1 : -1)];
  return {
    difficulty: levelCandidate ? levelCandidate : quizStatus.difficulty,
    straightPoints: 0,
  };
};

const tryChange = (quizStatus: QuizStatus, isCorrect: boolean): QuizStatus => {
  if (
    quizStatus.straightPoints !== 0 &&
    quizStatus.straightPoints % MAX_STRAIGHT === 0
  ) {
    return getDifficulty(quizStatus, isCorrect);
  }

  return {
    difficulty: quizStatus.difficulty,
    straightPoints: quizStatus.straightPoints + 1,
  };
};

export default tryChange;
