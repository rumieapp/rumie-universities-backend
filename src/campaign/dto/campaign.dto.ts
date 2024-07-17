import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsArray,
  IsUrl,
  IsEnum,
  IsBoolean,
  IsString,
} from 'class-validator';
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

  @Field({ nullable: true })
  location?: string;

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

  @Field()
  campaignStartAt: string;

  @Field()
  campaignEndAt: string;

  @Field(() => Int)
  campaignDuration: number;

  @Field()
  eventDayTime: string;

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

  @Field()
  @IsNotEmpty()
  campaignStartAt: string;

  @Field()
  @IsNotEmpty()
  campaignEndAt: string;

  @Field()
  @IsNotEmpty()
  eventDayTime: string;

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

  @Field()
  @IsNotEmpty()
  campaignStartAt: string;

  @Field()
  @IsNotEmpty()
  campaignEndAt: string;

  @Field()
  @IsNotEmpty()
  eventDayTime: string;

  @Field()
  @IsBoolean()
  showOnApp: boolean;
}
