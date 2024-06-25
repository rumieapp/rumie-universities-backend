import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Make sure you have a PrismaService that handles the Prisma client instance
import { InstitutionDto } from './dto/institution.dto';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) {}

  async getInstitutionBySlug(slug: string): Promise<InstitutionDto> {
    return this.prisma.institutionSetting.findUnique({
      where: { slug },
    });
  }
}
