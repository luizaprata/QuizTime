import { DifficultyEnum } from './Trivia.types';

type DifficultyScore = { hits: number; errors: number };

export type Score = {
  [DifficultyEnum.easy]: DifficultyScore;
  [DifficultyEnum.medium]: DifficultyScore;
  [DifficultyEnum.hard]: DifficultyScore;
};

export interface IWorkspace {
  id: number;
  name: string;
  scores: Realm.Results<IScore>;
}

export interface IScore {
  id: string;
  difficulty: string;
  hits: number;
  errors: number;
  workspace: IWorkspace;
}
