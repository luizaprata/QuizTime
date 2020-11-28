import { ObjectSchema } from 'realm';

export const WorkspaceSchema: ObjectSchema = {
  name: 'Workspace',
  primaryKey: 'id',
  properties: {
    id: 'string',
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
    name: 'string',
    hits: 'int',
    errors: 'int',
    workspace: 'Workspace',
  },
};
