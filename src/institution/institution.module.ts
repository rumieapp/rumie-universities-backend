import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionResolver } from './institution.resolver';
import { SharedModule } from 'src/shared/shared.module';
import { InstitutionController } from './institution.controller';

@Module({
  imports:[SharedModule],
  providers: [InstitutionService, InstitutionResolver],
  controllers:[InstitutionController]
})
export class InstitutionModule {}
