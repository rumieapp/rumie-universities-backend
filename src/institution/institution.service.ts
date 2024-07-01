import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Make sure you have a PrismaService that handles the Prisma client instance
import { InstitutionDto } from './dto/institution.dto';
import { UpdateInstitutionSettingInput } from './dto/update-institution-setting.input';
import { Institution } from '@prisma/client';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) {}

  async getInstitutionBySlug(slug: string): Promise<InstitutionDto> {
    return this.prisma.institution.findUnique({
      where: { slug },
    });
  }


  async updateInstitutionSetting(id: string, data: UpdateInstitutionSettingInput): Promise<Institution> {
    const institutionSetting = await this.prisma.institution.findUnique({ where: { id } });

    if (!institutionSetting) {
      throw new NotFoundException(`InstitutionSetting with ID ${id} not found`);
    }

    return this.prisma.institution.update({
      where: { id },
      data,
    });
  }

}
