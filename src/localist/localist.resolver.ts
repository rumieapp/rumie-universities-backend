import { Resolver, Query, Args } from '@nestjs/graphql';
import { LocalistService } from './localist.service';
import { EventResponse } from './dto/event-response.dto';

@Resolver(() => EventResponse)
export class LocalistResolver {
  constructor(private readonly localistService: LocalistService) {}

  @Query(() => EventResponse)
  async getAllEvents(): Promise<EventResponse> {
    return this.localistService.getAllEvents();
  }

  @Query(() => EventResponse, { nullable: true })
  async getEvent(
    @Args('id', { type: () => String }) id: string
  ): Promise<EventResponse> {
    return this.localistService.getEventById(id);
  }
}
