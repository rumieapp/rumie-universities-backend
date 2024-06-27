import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CampaignDto } from './campaign.dto';


@ObjectType()
export class CampaignWithAnalyticsDto extends CampaignDto {
  @Field(() => Int, { defaultValue: 0 })
  uniqueImpression: number;

  @Field(() => Int, { defaultValue: 0 })
  clicks: number;

  @Field(() => Int, { defaultValue: 0 })
  ctr: number;

  @Field(() => Int, { defaultValue: 0 })
  male: number;

  @Field(() => Int, { defaultValue: 0 })
  female: number;
}
