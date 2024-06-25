import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignDto, CreateCampaignInput } from './dto/campaign.dto';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async createCampaign(data: CreateCampaignInput): Promise<CampaignDto> {
    const campaign = await this.prisma.campaign.create({
        data: {
            ...data,
            tags: { connect: data.tags.map((tagId) => ({ id: tagId })) }
          },
    });
    return campaign;
  }

  async getAllCampaigns(): Promise<CampaignDto[]> {
    return this.prisma.campaign.findMany();
  }
}
