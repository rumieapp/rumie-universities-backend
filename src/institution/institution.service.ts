import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Make sure you have a PrismaService that handles the Prisma client instance
import { InstitutionDto } from './dto/institution.dto';
import { UpdateInstitutionSettingInput } from './dto/update-institution-setting.input';
import { Institution } from '@prisma/client';
import { GenderWise, UniversityStats } from './dto/university-stats.dto';
import { RegisterInstitutionDto } from 'src/auth/register.dto';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) {}

  async getInstitutionBySlug(slug: string): Promise<InstitutionDto> {
    return this.prisma.institution.findUnique({
      where: { slug },
    });
  }

  async getInstitutionList(): Promise<InstitutionDto[]>{
    const institutions = await this.prisma.institution.findMany();
    return institutions.map(institution => {
        const { sessions, ...institutionWithoutUnwantedProperties } = institution;
        return institutionWithoutUnwantedProperties;
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

  async getUniversityStats(): Promise<UniversityStats> {
    let results = new UniversityStats();
    results.impression = [100, 200, 300, 400];
    results.genderWise = {
      male: 4000,
      female: 5000
    } as GenderWise;
    results.listing = 500000;
    results.totalCampaign = 1000000;
    return results;
  }

  async createInstitution(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionDto> {
    try {
      const newInstitution = await this.prisma.institution.create({
          data: registerInstitutionDto,
      });
      const { sessions, ...institutionWithoutUnwantedProperties } = newInstitution;
      return institutionWithoutUnwantedProperties;
  } catch (error) {
      if (error.code === 'P2002' && error.meta?.target.includes('slug')) {
          throw new ConflictException('The slug provided already exists.');
      }
      throw error;
  }
  }

}
