import Realm from 'realm';
import cuid from 'cuid';
import {
  ScoreSchema,
  WorkspaceSchema,
} from '@/modules/quiz/schema/Quiz.scheme';
import { DIFFICULTY_ORDER } from '@/modules/quiz/QuizByCategoryScreen/quiz-status';

export const schemas = [WorkspaceSchema, ScoreSchema];

export const realm = new Realm({
  schema: schemas,
  deleteRealmIfMigrationNeeded: true,
});

export function seedDatabase() {
  if (!realm.empty) {
    return;
  }
  realm.write(() => {
    const scoreTypeList = ['difficulty'];
    scoreTypeList.forEach((workspaceId) => {
      const workspace = realm.create(WorkspaceSchema.name, { id: workspaceId });

      DIFFICULTY_ORDER.forEach((n) => {
        const score = {
          id: cuid(),
          name: n,
          hits: 0,
          errors: 0,
          workspace,
        };

        realm.create(ScoreSchema.name, score);
      });
    });
  });
}
