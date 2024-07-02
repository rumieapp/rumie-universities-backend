import { registerEnumType } from '@nestjs/graphql';

export enum SupportStatusType {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

registerEnumType(SupportStatusType, {
  name: 'SupportStatusType', // this one is mandatory
  description: 'The types of the status of support request', // this one is optional
});