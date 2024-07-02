import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { SupportRequestService } from './support-request.service';
import { CreateSupportRequestInput } from './dto/create-support-request.input';
import { SupportRequestDto } from './dto/support-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {  UseGuards } from '@nestjs/common';
import { SupportRequestFilterInput } from './dto/support-request-filter.input';


@Resolver()
export class SupportRequestResolver {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @Mutation(() => SupportRequestDto)
  @UseGuards(JwtAuthGuard)
  async createSupportRequest(
    @Context() context:any,
    @Args('inputs') createSupportRequestInput: CreateSupportRequestInput,
  ): Promise<SupportRequestDto> {
    const authUser = context.req.user;
    
    const supportRequest =  await this.supportRequestService.createSupportRequest(authUser, createSupportRequestInput);
    return supportRequest as SupportRequestDto;
  }

  @Query(() => [SupportRequestDto])
  @UseGuards(JwtAuthGuard)
  async getSupportRequestList(
    @Context() context: any,
    @Args('filters', { type: () => SupportRequestFilterInput, nullable: true }) filter?: SupportRequestFilterInput,
  ){
    const userId = context.req.user.id;
    return await this.supportRequestService.getSupportRequestsByUser(userId, filter);
  }

}
