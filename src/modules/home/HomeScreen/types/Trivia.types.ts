export type CategoriesResponse = {
  trivia_categories: Category[];
};

export type Category = { id: number; name: string };
