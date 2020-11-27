export type CategoriesResponse = {
  trivia_categories: Category[];
};
export type QuestionResponse = {
  response_code: ResponseCodeEnum;
  results: Question[];
};

export type Category = { id: number; name: string };

export enum QuestionTypeEnum {
  boolean = 'boolean',
  multiple = 'multiple',
}

export enum DifficultyEnum {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export enum ResponseCodeEnum {
  Success = 0,
  NoResults,
  InvalidParameter,
  TokenNotFound,
  TokenEmpty,
}

export type Question = {
  category: string;
  type: QuestionTypeEnum;
  difficulty: DifficultyEnum;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
