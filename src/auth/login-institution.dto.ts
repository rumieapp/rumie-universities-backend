import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class LoginInstitutionDto {
  @Field()
  @IsNotEmpty()
  slug: string;

  @Field()
  @IsNotEmpty()
  pinCode: string;
}
