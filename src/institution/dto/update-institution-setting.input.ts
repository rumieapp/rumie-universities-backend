import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl } from 'class-validator';

@InputType()
export class UpdateInstitutionSettingInput {
  @Field()
  @IsNotEmpty()
  institutionName: string;

  @Field()
  @IsNotEmpty()
  pinCode: string;

  @Field()
  @IsUrl()
  profilePicture: string;

  @Field()
  @IsNotEmpty()
  schoolColor: string;
}
