import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportRequestResolver } from './support-request.resolver';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[SharedModule],
  providers: [SupportRequestService, SupportRequestResolver]
})
export class SupportRequestModule {}
