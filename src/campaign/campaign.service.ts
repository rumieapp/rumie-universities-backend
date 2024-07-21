import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CampaignDto,
  CampaignPaginatedResponse,
  CreateCampaignInput,
  GetUniversityCampaignsInput,
  UpdateCampaignInput,
} from './dto/campaign.dto';
// import { differenceInDays } from 'date-fns';
import { CampaignType as PrismaCampaignType } from '@prisma/client';
import { CampaignType } from 'src/enums/campaign-type.enum';
import { Tag } from 'src/enums/campaign-tag.enum';
import { CampaignWithAnalyticsDto } from './dto/campaign-with-analytics.dto';
import { CampaignFilterInput } from './dto/campaign-filters.input';
import {
  differenceInDays,
  fromUnixTime,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
} from 'date-fns';

export enum TimeframeFilter {
  THIS_WEEK = 'THIS_WEEK',
  THIS_MONTH = 'THIS_MONTH',
  NEXT_MONTH = 'NEXT_MONTH',
}

function daysBetweenEpochTimestamps(timestamp1, timestamp2) {
  // Convert epoch timestamps from seconds to milliseconds
  const date1 = fromUnixTime(timestamp1);
  const date2 = fromUnixTime(timestamp2);

  // Calculate the difference in days
  const diffInDays = differenceInDays(date2, date1);

  return Math.abs(diffInDays); // Return absolute value to handle cases where timestamp2 < timestamp1
}

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async createCampaign(
    institutionId,
    data: CreateCampaignInput,
  ): Promise<CampaignDto> {
    const campaignStartAt = data.campaignStartAt;
    const campaignEndAt = data.campaignEndAt;
    const eventDayTime = data.eventDayTime;
    const campaignDuration = daysBetweenEpochTimestamps(
      campaignEndAt,
      campaignStartAt,
    );

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

  async getAllCampaigns(
    institutionId,
    filters?: CampaignFilterInput,
  ): Promise<CampaignDto[]> {
    const where: any = { userId: institutionId };
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
      throw new BadRequestException(
        `The provided campaignId is not a valid MongoDB ObjectId`,
      );
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

  async updateCampaign(
    userId: string,
    campaignId: string,
    data: UpdateCampaignInput,
  ): Promise<CampaignDto> {
    const existingCampaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!existingCampaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    if (existingCampaign.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this campaign',
      );
    }
    const campaignStartAt = data.campaignStartAt;
    const campaignEndAt = data.campaignEndAt;
    const eventDayTime = data.eventDayTime;
    const campaignDuration = daysBetweenEpochTimestamps(
      campaignEndAt,
      campaignStartAt,
    );

    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        ...data,
        campaignDuration,
        campaignStartAt,
        campaignEndAt,
        eventDayTime,
      },
    });
    return this.mapToDto(campaign);
  }

  async getCampaignsByInstitutionIdV2({
    institutionId,
    skip,
    take,
    timeframe,
  }: GetUniversityCampaignsInput): Promise<CampaignPaginatedResponse> {
    const now = Date.now();

    const whereClause: any = {
      userId: institutionId,
      campaignStartAt: { lte: now },
      campaignEndAt: { gte: now },
    };

    if (timeframe) {
      let startDate: number, endDate: number;

      switch (timeframe) {
        case TimeframeFilter.THIS_WEEK:
          startDate = startOfWeek(now).getTime();
          endDate = endOfWeek(now).getTime();
          break;
        case TimeframeFilter.THIS_MONTH:
          startDate = startOfMonth(now).getTime();
          endDate = endOfMonth(now).getTime();
          break;
        case TimeframeFilter.NEXT_MONTH:
          const nextMonth = addMonths(now, 1);
          startDate = startOfMonth(nextMonth).getTime();
          endDate = endOfMonth(nextMonth).getTime();
          break;
      }

      whereClause.eventDayTime = {
        gte: startDate,
        lte: endDate,
      };
    }

    const [campaigns, totalCount] = await Promise.all([
      this.prisma.campaign.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { eventDayTime: 'asc' },
      }),
      this.prisma.campaign.count({ where: whereClause }),
    ]);

    console.log(campaigns);

    if (!campaigns.length) {
      return { campaigns: [], totalCount: 0 };
    }

    return {
      campaigns: campaigns.map(this.mapToDto),
      totalCount,
    };
  }

  async getCampaignsByInstitutionId(
    institutionId: string,
  ): Promise<CampaignDto[]> {
    const campaigns = await this.prisma.campaign.findMany({
      where: { userId: institutionId },
    });

    if (!campaigns.length) {
      throw new NotFoundException(
        `No campaigns found for user with ID ${institutionId}`,
      );
    }

    return campaigns.map(this.mapToDto);
  }

  private mapToDto(campaign: any): CampaignDto {
    return {
      ...campaign,
      type: campaign.type as CampaignType,
      tag: campaign.tag as Tag,
    };
  }
}
