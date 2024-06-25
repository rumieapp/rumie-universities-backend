import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import { CampaignDto, CreateCampaignInput } from './dto/campaign.dto';

@Resolver(() => CampaignDto)
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Query(() => [CampaignDto])
  async getAllCampaigns(): Promise<CampaignDto[]> {
    return this.campaignService.getAllCampaigns();
  }

  @Mutation(() => CampaignDto)
  async createCampaign(
    @Args('createCampaignInput') createCampaignInput: CreateCampaignInput,
  ): Promise<CampaignDto> {
    return this.campaignService.createCampaign(createCampaignInput);
  }
}
