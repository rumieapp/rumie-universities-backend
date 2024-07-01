import { Resolver, Query, Args, Mutation, ID, Context } from '@nestjs/graphql';
import { InstitutionService } from './institution.service';
import { InstitutionDto } from './dto/institution.dto';
import { UpdateInstitutionSettingInput } from './dto/update-institution-setting.input';
import { Institution } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @Mutation(() => InstitutionDto)
  @UseGuards(JwtAuthGuard)
  async updateInstitutionSetting(
    @Context() context: any,
    @Args('input') data: UpdateInstitutionSettingInput
  ): Promise<Institution> {
    const id = context.req.user.id;
    console.log(id)
    return this.institutionService.updateInstitutionSetting(id, data);
  }
}
