import {
  ObjectType,
  Field,
  ID,
  Int,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsEnum,
  IsBoolean,
  IsString,
} from 'class-validator';
import { CampaignType } from 'src/enums/campaign-type.enum'; // Import the registered CampaignType enum
import { Tag } from 'src/enums/campaign-tag.enum';
import { TimeframeFilter } from '../campaign.service';
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

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  localistId?: string;

  @Field({ nullable: true })
  locationCoordinates?: string;

  @Field(() => CampaignType) // Use the registered CampaignType enum
  @IsEnum(CampaignType)
  type: CampaignType;

  @Field(() => Tag)
  @IsEnum(Tag)
  tag: Tag;

  @Field({ nullable: true })
  campaignImage?: string;

  @Field(() => Int)
  campaignStartAt: number;

  @Field(() => Int)
  campaignEndAt: number;

  @Field(() => Int)
  campaignDuration: number;

  @Field(() => Int)
  eventDayTime: number;

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
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  locationCoordinates?: string;

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

  @Field(() => Int)
  @IsNotEmpty()
  campaignStartAt: number;

  @Field(() => Int)
  @IsNotEmpty()
  campaignEndAt: number;

  @Field(() => Int)
  @IsNotEmpty()
  eventDayTime: number;

  @Field()
  @IsBoolean()
  showOnApp: boolean;
}

@InputType()
export class UpdateCampaignInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  locationCoordinates?: string;

  @Field(() => CampaignType)
  @IsEnum(CampaignType)
  type: CampaignType;

  @Field(() => Tag)
  @IsEnum(Tag)
  tag: Tag;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  campaignImage?: string;

  @Field(() => Int)
  @IsNotEmpty()
  campaignStartAt: number;

  @Field(() => Int)
  @IsNotEmpty()
  campaignEndAt: number;

  @Field(() => Int)
  @IsNotEmpty()
  eventDayTime: number;

  @Field()
  @IsBoolean()
  showOnApp: boolean;
}

@ObjectType()
export class CampaignPaginatedResponse {
  @Field(() => [CampaignDto])
  campaigns: CampaignDto[];

  @Field(() => Int)
  totalCount: number;
}

registerEnumType(TimeframeFilter, {
  name: 'TimeframeFilter',
});

@InputType()
export class GetUniversityCampaignsInput {
  @Field(() => String)
  institutionId: string;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => TimeframeFilter, { nullable: true })
  timeframe?: TimeframeFilter;
}
