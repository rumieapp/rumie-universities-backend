import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';


@InputType()
export class RegisterInstitutionDto {
  @Field()
  @IsNotEmpty()
  institutionName: string;

  @Field()
  @IsNotEmpty()
  slug: string;

  @Field()
  @IsNotEmpty()
  pinCode: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  schoolColor?: string;

}
