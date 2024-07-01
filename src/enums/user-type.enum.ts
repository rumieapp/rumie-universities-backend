import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  ADMIN = 'ADMIN',
  INSTITUTION = 'INSTITUTION',
}

registerEnumType(UserType, {
  name: 'UserType', // this one is mandatory
  description: 'The types of users', // this one is optional
});