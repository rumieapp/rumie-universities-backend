import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignDto, CreateCampaignInput } from './dto/campaign.dto';
import { differenceInDays } from 'date-fns';
import { CampaignType as PrismaCampaignType } from '@prisma/client';
import { CampaignType } from 'src/enums/campaign-type.enum';
import { Tag } from 'src/enums/campaign-tag.enum';
import { CampaignWithAnalyticsDto } from './dto/campaign-with-analytics.dto';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async createCampaign(data: CreateCampaignInput): Promise<CampaignDto> {
    const campaignStartAt = new Date(data.campaignStartAt);
    const campaignEndAt = new Date(data.campaignEndAt);
    const eventDay = new Date(data.eventDay);
    const eventTime = new Date(data.eventTime);
    const campaignDuration = differenceInDays(campaignEndAt, campaignStartAt);

    const createdCampaign = await this.prisma.campaign.create({
      data: {
        ...data,
        campaignDuration,
        campaignStartAt,
        campaignEndAt,
        type: data.type as PrismaCampaignType,
        tag: data.tag as Tag,
        eventDay,
        eventTime,
      },
    });

    return this.mapToDto(createdCampaign);
  }

  async getAllCampaigns(): Promise<CampaignDto[]> {
    const campaigns = await this.prisma.campaign.findMany();
    return campaigns.map(this.mapToDto);
  }

  async getCampaignById(campaignId: string): Promise<CampaignWithAnalyticsDto> {
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(campaignId);
    if (!isValidObjectId) {
      throw new BadRequestException(`The provided campaignId is not a valid MongoDB ObjectId`);
    }

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    return {
      ...this.mapToDto(campaign),
      uniqueImpression: 0,
      clicks: 0,
      ctr: 0,
      male: 0,
      female: 0,
    };
  }

  private mapToDto(campaign: any): CampaignDto {
    return {
      ...campaign,
      type: campaign.type as CampaignType,
      tag: campaign.tag as Tag,
    };
  }
}
