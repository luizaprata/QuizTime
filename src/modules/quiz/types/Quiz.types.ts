export type DifficultyScore = { hits: number; errors: number };

export interface IWorkspace {
  id: number;
  name: string;
  scores: Realm.Results<IScore>;
}

export interface IScore {
  id: number;
  difficulty: string;
  hits: number;
  errors: number;
  workspace: IWorkspace;
}
