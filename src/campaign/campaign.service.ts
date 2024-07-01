import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignDto, CreateCampaignInput, UpdateCampaignInput } from './dto/campaign.dto';
import { differenceInDays } from 'date-fns';
import { CampaignType as PrismaCampaignType } from '@prisma/client';
import { CampaignType } from 'src/enums/campaign-type.enum';
import { Tag } from 'src/enums/campaign-tag.enum';
import { CampaignWithAnalyticsDto } from './dto/campaign-with-analytics.dto';
import { CampaignFilterInput } from './dto/campaign-filters.input';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async createCampaign(institutionId, data: CreateCampaignInput): Promise<CampaignDto> {
    const campaignStartAt = new Date(data.campaignStartAt);
    const campaignEndAt = new Date(data.campaignEndAt);
    const eventDayTime = new Date(data.eventDayTime);
    const campaignDuration = differenceInDays(campaignEndAt, campaignStartAt);

    const createdCampaign = await this.prisma.campaign.create({
      data: {
        ...data,
        userId: institutionId,
        campaignDuration,
        campaignStartAt,
        campaignEndAt,
        type: data.type as PrismaCampaignType,
        tag: data.tag as Tag,
        eventDayTime,
      },
    });

    return this.mapToDto(createdCampaign);
  }

  async getAllCampaigns(institutionId, filters?: CampaignFilterInput): Promise<CampaignDto[]> {  
    const where: any = {userId:institutionId};
    if (filters) {
      if (typeof filters.isShownOnApp !== 'undefined') {
        where.showOnApp = filters.isShownOnApp;
      }
    }
    const campaigns = await this.prisma.campaign.findMany({ where });
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
      uniqueImpression: 2500000,
      clicks: 300000,
      ctr: 100,
      male: 100000,
      female: 999999,
    };
  }


  async updateCampaign(userId:string,  campaignId: string, data: UpdateCampaignInput): Promise<CampaignDto> {

    const existingCampaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });
  
    if (!existingCampaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }
  
    if (existingCampaign.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this campaign');
    }
    
    const campaignStartAt = new Date(data.campaignStartAt);
    const campaignEndAt = new Date(data.campaignEndAt);
    const eventDayTime = new Date(data.eventDayTime);
    const campaignDuration = differenceInDays(campaignEndAt, campaignStartAt);

    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        ...data,
        campaignDuration,
        campaignStartAt,
        campaignEndAt,
        eventDayTime
      },
    });
    return this.mapToDto(campaign);
  }


  private mapToDto(campaign: any): CampaignDto {
    return {
      ...campaign,
      type: campaign.type as CampaignType,
      tag: campaign.tag as Tag,
    };
  }
}
