import { InputType, Field } from '@nestjs/graphql';
import { SupportStatusType } from 'src/enums/support-request-status-type.enum';


@InputType()
export class SupportRequestFilterInput {
  @Field(() => SupportStatusType, { nullable: true })
  status?: SupportStatusType;
}
