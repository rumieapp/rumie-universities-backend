import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class RegisterInstitutionDto {
  
  @ApiProperty({
    required:true,
  })
  @Field()
  @IsNotEmpty()
  institutionName: string;

  @ApiProperty({
    description: 'The slug of university is an unique field. It will check and through error before inserting',
    required:true,
    example:'slug-name'
  })
  @Field()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    required:true,
  })
  @Field()
  @IsNotEmpty()
  passCode: string;

  @ApiProperty({
    required:false
  })
  @Field({ nullable: true })
  logo?: string;

  @ApiProperty({
    required:false
  })
  @Field({ nullable: true })
  schoolColor?: string;

}
