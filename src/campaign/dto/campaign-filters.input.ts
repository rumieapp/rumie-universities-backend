// src/campaign/campaign-filters.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CampaignFilterInput {
  @Field({ nullable: true })
  isShownOnApp?: boolean;
}
