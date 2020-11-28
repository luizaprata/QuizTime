import { DifficultyEnum } from '@/types/Trivia.types';
import tryChangeDifficulty, {
  DIFFICULTY_ORDER,
} from './try-change-difficulty-level';

describe('try-change-difficulty-level', () => {
  test('The degree of difficulty of the questions SHOULD follows the pattern: easy, medium and difficult.', () => {
    expect(DIFFICULTY_ORDER).toEqual([
      DifficultyEnum.easy,
      DifficultyEnum.medium,
      DifficultyEnum.hard,
    ]);
  });

  test('WHEN user hits 2 followed by the level easy, the next question to be shown SHOULD be medium difficulty', () => {
    const result = tryChangeDifficulty(
      { straightPoints: 2, difficulty: DifficultyEnum.easy },
      true,
    );

    expect(result).toEqual({
      straightPoints: 0,
      difficulty: DifficultyEnum.medium,
    });
  });

  test('WHEN user hits 2 followed by the level medium, the next question to be shown SHOULD be hard difficulty', () => {
    const result = tryChangeDifficulty(
      { straightPoints: 2, difficulty: DifficultyEnum.medium },
      true,
    );

    expect(result).toEqual({
      straightPoints: 0,
      difficulty: DifficultyEnum.hard,
    });
  });

  test('WHEN user hits 2 followed by the level hard, the next question to be shown SHOULD be hard difficulty', () => {
    const result = tryChangeDifficulty(
      { straightPoints: 2, difficulty: DifficultyEnum.hard },
      true,
    );

    expect(result).toEqual({
      straightPoints: 0,
      difficulty: DifficultyEnum.hard,
    });
  });

  test('WHEN user misses 2 followed by the level hard, the next question to be shown SHOULD be medium difficulty', () => {
    const result = tryChangeDifficulty(
      { straightPoints: 2, difficulty: DifficultyEnum.hard },
      false,
    );

    expect(result).toEqual({
      straightPoints: 0,
      difficulty: DifficultyEnum.medium,
    });
  });

  test('WHEN user misses 2 followed by the level medium, the next question to be shown SHOULD be easy difficulty', () => {
    const result = tryChangeDifficulty(
      { straightPoints: 2, difficulty: DifficultyEnum.medium },
      false,
    );

    expect(result).toEqual({
      straightPoints: 0,
      difficulty: DifficultyEnum.easy,
    });
  });

  test('WHEN user misses 2 followed by the level easy, the next question to be shown SHOULD be easy difficulty', () => {
    const result = tryChangeDifficulty(
      { straightPoints: 2, difficulty: DifficultyEnum.easy },
      false,
    );

    expect(result).toEqual({
      straightPoints: 0,
      difficulty: DifficultyEnum.easy,
    });
  });

  test('WHEN user misses 1 level medium, the next question to be shown SHOULD be medium difficulty', () => {
    const result = tryChangeDifficulty(
      { straightPoints: 0, difficulty: DifficultyEnum.medium },
      false,
    );

    expect(result).toEqual({
      straightPoints: 1,
      difficulty: DifficultyEnum.medium,
    });
  });
});
