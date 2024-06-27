import { registerEnumType } from '@nestjs/graphql';
import { CampaignType as PrismaCampaignType } from '@prisma/client';

export enum CampaignType {
  LISTING = 'LISTING',
  BANNER = 'BANNER',
  POPUP = 'POPUP',
}

registerEnumType(CampaignType, {
  name: 'CampaignType', // this one is mandatory
  description: 'The basic campaign types', // this one is optional
});
