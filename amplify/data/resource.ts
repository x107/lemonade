import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { Severity } from './enums/severity';

const schema = a.schema({
  Request: a
    .model({
      name: a.string(),
      description: a.string(),
      severity: a.enum(Severity),
      creationDate: a.date(),
      resolutionDate: a.date(),
      reporterName: a.string(),
      reporterEmail: a.string(),
      reporterLocation: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
});
