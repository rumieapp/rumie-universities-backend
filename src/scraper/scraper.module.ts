import { Module } from '@nestjs/common';
import { ScrapperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  controllers: [ScrapperController],
  providers: [ScraperService]
})
export class ScrapperModule {}
