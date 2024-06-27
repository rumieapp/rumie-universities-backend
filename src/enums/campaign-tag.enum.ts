import { registerEnumType } from '@nestjs/graphql';

export enum Tag {
  EVENT = 'EVENT',
  SPORT = 'SPORT',
  RESOURCES = 'RESOURCES',
}

registerEnumType(Tag, {
  name: 'Tag',
  description: 'The basic tags for campaigns',
});