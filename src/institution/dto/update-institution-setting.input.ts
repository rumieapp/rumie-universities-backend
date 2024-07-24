import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl } from 'class-validator';

@InputType()
export class UpdateInstitutionSettingInput {
  @Field()
  @IsNotEmpty()
  institutionName: string;

  @Field()
  @IsNotEmpty()
  passCode: string;

  @Field()
  @IsUrl()
  logo?: string;

  @Field()
  @IsNotEmpty()
  schoolColor: string;

  @Field({ nullable: true })
  localistCalendarUrl: string;
}
