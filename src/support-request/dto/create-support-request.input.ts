import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';


@InputType()
export class CreateSupportRequestInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  message: string;
}
