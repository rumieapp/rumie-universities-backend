import { Module } from '@nestjs/common';
import { LocalistService } from './localist.service';
import { LocalistController } from './localist.controller';
import { LocalistResolver } from './localist.resolver';

@Module({
  providers: [LocalistService, LocalistResolver],
  controllers: [LocalistController]
})
export class LocalistModule {}
