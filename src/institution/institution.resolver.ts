import { Resolver, Query, Args, Mutation, ID, Context } from '@nestjs/graphql';
import { InstitutionService } from './institution.service';
import { InstitutionDto } from './dto/institution.dto';
import { UpdateInstitutionSettingInput } from './dto/update-institution-setting.input';
import { Institution } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UniversityStats } from './dto/university-stats.dto';

@Resolver(() => InstitutionDto)
export class InstitutionResolver {
  constructor(private readonly institutionService: InstitutionService) {}


  @Query(()=> InstitutionDto)
  @UseGuards(JwtAuthGuard)
  async me(
    @Context() context: any,
  ){
    const user = context.req.user;
    return user as InstitutionDto;
  }


  @Query(() => InstitutionDto, { nullable: true })
  async getInstitutionBySlug(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<InstitutionDto> {
    return this.institutionService.getInstitutionBySlug(slug);
  }

  @Query( ()=> [InstitutionDto], {nullable:true})
  async getInstitutionList(): Promise<InstitutionDto[]>{
    return this.institutionService.getInstitutionList();
  }

  @Mutation(() => InstitutionDto)
  @UseGuards(JwtAuthGuard)
  async updateInstitutionSetting(
    @Context() context: any,
    @Args('input') data: UpdateInstitutionSettingInput
  ): Promise<Institution> {
    const id = context.req.user.id;
    return this.institutionService.updateInstitutionSetting(id, data);
  }
  @Query( ()=> UniversityStats)
  @UseGuards(JwtAuthGuard)
  async getUniversityStats(
    @Context() context:any
  ){
    const user = context.req.user;
    return await this.institutionService.getUniversityStats();
  }

  @Query(() => InstitutionDto)
  async getInstitutionById(
    @Args('institutionId', { type: () => ID }) institutionId: string,
  ): Promise<InstitutionDto> {
    return this.institutionService.getInstitutionById(institutionId);
  }
}
