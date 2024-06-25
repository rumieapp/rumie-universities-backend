import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import axios from 'axios';
import { EventResponse } from './dto/event-response.dto';

@Injectable()
export class LocalistService {
  private readonly apiUrl = process.env.LOCALIST_API_URL;


  async getAllEvents(): Promise<EventResponse> {
    try {
      const response = await axios.get(`${this.apiUrl}/events`);
      const events = response.data.events.map((item: any) => item.event);
      return {
        events,
        page: response.data.page,
        date: response.data.date,
      };
    } catch (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }

  async getEventById(id: string): Promise<EventResponse> {
    try {
      const response = await axios.get(`${this.apiUrl}/events/${id}`);
      return {
        events: [response.data.event],
        page: {},
        date: {},
      };
    } catch (error) {
      throw new Error(`Failed to fetch event: ${error.message}`);
    }
  }
}
