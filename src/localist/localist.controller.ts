import { Controller, Get, Param } from '@nestjs/common';
import { LocalistService } from './localist.service';

@Controller('events')
export class LocalistController {

    constructor(private readonly localistService: LocalistService) {}

    @Get('/')
    async getAllEvents(){
        const allEvent = await this.localistService.getAllEvents();
        return allEvent;
    }

    @Get('/:id')
    async getEvent(
        @Param('id')
        id: string
    ){
        const eventDetails = await this.localistService.getEventById(id);
        return eventDetails;
    }

}
