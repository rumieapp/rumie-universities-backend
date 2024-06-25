import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { CampaignType } from '@prisma/client';

@ObjectType()
export class CampaignDto {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  url?: string;

  @Field(() => String)
  type: CampaignType;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  campaignImage?: string;

  @Field()
  campaignStartAt: Date;

  @Field()
  campaignEndAt: Date;

  @Field(() => Int)
  campaignDuration: number;

  @Field()
  eventDay: Date;

  @Field()
  eventTime: Date;

  @Field()
  showOnApp: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateCampaignInput {
  @Field()
  userId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  url?: string;

  @Field(() => String)
  type: CampaignType;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  campaignImage?: string;

  @Field()
  campaignStartAt: Date;

  @Field()
  campaignEndAt: Date;

  @Field(() => Int)
  campaignDuration: number;

  @Field()
  eventDay: Date;

  @Field()
  eventTime: Date;

  @Field()
  showOnApp: boolean;
}
