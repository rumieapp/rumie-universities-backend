import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionResolver } from './institution.resolver';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[SharedModule],
  providers: [InstitutionService, InstitutionResolver]
})
export class InstitutionModule {}
