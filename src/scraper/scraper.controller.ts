import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScrapperController {
    constructor(private readonly scraperService: ScraperService) {}
    
    @Get('/')
    async scrape(@Query('url') url: string): Promise<any[]> {
        if (!url) {
            throw new Error('URL is required');
        }
        return this.scraperService.scrapeWebsite(url);
    }
    
    @Get('university-list')
    async universityList(@Query('url') url: string): Promise<any[]> {
        if (!url) {
            throw new Error('URL is required');
        }
        return this.scraperService.scrapeUniversities(url);
    }

    @Get('/university-details')
    async universityDetails(@Query('url') url: string): Promise<any> {
        if (!url) {
            throw new Error('URL is required');
        }
        return this.scraperService.scrapeUniversityDetails(url);
    }
}
