import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import {
  CampaignDto,
  CreateCampaignInput,
  UpdateCampaignInput,
} from './dto/campaign.dto';
import { CampaignWithAnalyticsDto } from './dto/campaign-with-analytics.dto';
import { CampaignFilterInput } from './dto/campaign-filters.input';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => CampaignDto)
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Query(() => [CampaignDto])
  @UseGuards(JwtAuthGuard)
  async getAllCampaigns(
    @Context() context: any,
    @Args('filters', { nullable: true }) filters?: CampaignFilterInput,
  ): Promise<CampaignDto[]> {
    const institutionId = context.req.user.id;
    return this.campaignService.getAllCampaigns(institutionId, filters);
  }

  @Mutation(() => CampaignDto)
  @UseGuards(JwtAuthGuard)
  async createCampaign(
    @Context() context: any,
    @Args('createCampaignInput') createCampaignInput: CreateCampaignInput,
  ): Promise<CampaignDto> {
    const institutionId = context.req.user.id;
    console.log(institutionId);
    return this.campaignService.createCampaign(
      institutionId,
      createCampaignInput,
    );
  }
  @Query(() => CampaignWithAnalyticsDto)
  async getCampaignById(@Args('campaignId') campaignId: string) {
    return await this.campaignService.getCampaignById(campaignId);
  }

  @Mutation(() => CampaignDto)
  @UseGuards(JwtAuthGuard)
  async updateCampaign(
    @Context() context: any,
    @Args('campaignId', { type: () => ID }) campaignId: string,
    @Args('updateCampaignInput') updateCampaignInput: UpdateCampaignInput,
  ): Promise<CampaignDto> {
    const userId = context.req.user.id;
    return this.campaignService.updateCampaign(
      userId,
      campaignId,
      updateCampaignInput,
    );
  }

  @Query(() => [CampaignDto])
  async getCampaignsByInstitutionId(
    @Args('institutionId', { type: () => ID }) institutionId: string,
  ): Promise<CampaignDto[]> {
    return this.campaignService.getCampaignsByInstitutionId(institutionId);
  }

  @Query(() => String)
  async getTest() {
    return 'test';
  }
}
