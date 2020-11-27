// O grau de dificuldade das questões segue o padrão: fácil, médio e difícil.
// Caso o usuário acerte 2 seguidas de um mesmo nível, a questão a ser mostrada deve ser de dificuldade
// superior a da questão atual. A dificuldade não deve ser alterada caso já esteja no nível difícil.
// Caso o usuário erre 2 seguidas de um mesmo nível, a questão a ser mostrada deve ser de dificuldade
// inferior a da questão atual. A dificuldade não deve ser alterada caso já esteja no nível fácil.

import { DifficultyEnum } from '@/types/Trivia.types';
import tryChangeDifficulty, {
  Difficulty,
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
      { hitsCount: 0, current: DifficultyEnum.easy },
      2,
    );

    expect(result).toEqual({ hitsCount: 2, current: DifficultyEnum.medium });
  });

  test('WHEN user hits 2 followed by the level medium, the next question to be shown SHOULD be hard difficulty', () => {
    const result = tryChangeDifficulty(
      { hitsCount: 2, current: DifficultyEnum.medium },
      4,
    );

    expect(result).toEqual({ hitsCount: 4, current: DifficultyEnum.hard });
  });

  test('WHEN user hits 2 followed by the level hard, the next question to be shown SHOULD be hard difficulty', () => {
    const result = tryChangeDifficulty(
      { hitsCount: 2, current: DifficultyEnum.hard },
      4,
    );

    expect(result).toEqual({ hitsCount: 4, current: DifficultyEnum.hard });
  });

  test('WHEN user misses 2 followed by the level hard, the next question to be shown SHOULD be medium difficulty', () => {
    const result = tryChangeDifficulty(
      { hitsCount: 0, current: DifficultyEnum.hard },
      -2,
    );

    expect(result).toEqual({ hitsCount: -2, current: DifficultyEnum.medium });
  });

  test('WHEN user misses 2 followed by the level medium, the next question to be shown SHOULD be easy difficulty', () => {
    const result = tryChangeDifficulty(
      { hitsCount: -2, current: DifficultyEnum.medium },
      -4,
    );

    expect(result).toEqual({ hitsCount: -4, current: DifficultyEnum.easy });
  });

  test('WHEN user misses 2 followed by the level easy, the next question to be shown SHOULD be easy difficulty', () => {
    const result = tryChangeDifficulty(
      { hitsCount: 4, current: DifficultyEnum.easy },
      2,
    );

    expect(result).toEqual({ hitsCount: 2, current: DifficultyEnum.easy });
  });
});
