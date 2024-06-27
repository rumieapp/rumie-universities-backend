import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsDateString, IsArray, IsUrl, IsEnum, IsBoolean } from 'class-validator';
import { CampaignType } from 'src/enums/campaign-type.enum'; // Import the registered CampaignType enum
import { Tag } from 'src/enums/campaign-tag.enum';
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

  @Field(() => CampaignType) // Use the registered CampaignType enum
  @IsEnum(CampaignType)
  type: CampaignType;

  @Field(() => Tag)
  @IsEnum(Tag)
  tag: Tag;

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
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  url?: string;

  @Field(() => CampaignType) // Use the registered CampaignType enum
  @IsEnum(CampaignType)
  type: CampaignType;

  @Field(() => Tag) // Use the registered Tag enum
  @IsEnum(Tag)
  tag: Tag;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  campaignImage?: string;

  @Field()
  @IsNotEmpty()
  campaignStartAt: Date;

  @Field()
  @IsNotEmpty()
  campaignEndAt: Date;

  @Field()
  @IsNotEmpty()
  eventDay: Date;

  @Field()
  @IsNotEmpty()
  eventTime: Date;

  @Field()
  @IsBoolean()
  showOnApp: boolean;
}
