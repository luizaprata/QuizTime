import { DifficultyEnum } from '@/modules/quiz/types/Trivia.types';

export type QuizStatus = {
  difficulty: DifficultyEnum;
  straightPoints: number;
  totalAnswers: number;
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
    ...quizStatus,
    difficulty: levelCandidate ? levelCandidate : quizStatus.difficulty,
    straightPoints: 0,
  };
};

export default (quizStatus: QuizStatus, isCorrect: boolean): QuizStatus => {
  quizStatus.totalAnswers += 1;

  const changedTendency =
    (isCorrect && quizStatus.straightPoints < 0) ||
    (!isCorrect && quizStatus.straightPoints > 0);

  if (changedTendency) {
    quizStatus.straightPoints = 0;
  } else {
    quizStatus.straightPoints += isCorrect ? 1 : -1;
  }

  if (
    quizStatus.straightPoints !== 0 &&
    quizStatus.straightPoints % MAX_STRAIGHT === 0
  ) {
    return getDifficulty(quizStatus, isCorrect);
  }

  return {
    ...quizStatus,
    difficulty: quizStatus.difficulty,
  };
};
