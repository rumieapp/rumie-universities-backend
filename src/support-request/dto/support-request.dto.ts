import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SupportStatusType } from 'src/enums/support-request-status-type.enum';

@ObjectType()
export class SupportRequestDto {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  ticketId: string

  @Field()
  email: string;

  @Field()
  message: string;

  @Field(() => SupportStatusType)
  status: SupportStatusType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

}
