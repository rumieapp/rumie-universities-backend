import { Resolver, Query, Args } from '@nestjs/graphql';
import { InstitutionService } from './institution.service';
import { InstitutionDto } from './dto/institution.dto';

@Resolver(() => InstitutionDto)
export class InstitutionResolver {
  constructor(private readonly institutionService: InstitutionService) {}

  @Query(() => InstitutionDto, { nullable: true })
  async getInstitutionBySlug(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<InstitutionDto> {
    return this.institutionService.getInstitutionBySlug(slug);
  }
}
