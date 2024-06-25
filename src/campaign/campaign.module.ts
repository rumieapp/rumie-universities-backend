import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { SharedModule } from 'src/shared/shared.module';
import { CampaignResolver } from './campaign.resolver';

@Module({
  imports:[SharedModule],
  providers: [CampaignService, CampaignResolver]
})
export class CampaignModule {}
