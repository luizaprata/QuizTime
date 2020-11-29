import { ObjectSchema } from 'realm';

export const WorkspaceSchema: ObjectSchema = {
  name: 'Workspace',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    scores: {
      type: 'linkingObjects',
      objectType: 'Score',
      property: 'workspace',
    },
  },
};

export const ScoreSchema: ObjectSchema = {
  name: 'Score',
  primaryKey: 'id',
  properties: {
    id: 'string',
    difficulty: 'string',
    hits: 'int',
    errors: 'int',
    workspace: 'Workspace',
  },
};
