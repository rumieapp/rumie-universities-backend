import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class InstitutionDto {
  @ApiProperty({ description: 'The unique identifier of the institution' })
  @Field(() => ID)
  id: string;

  @ApiProperty({ description: 'The name of the institution' })
  @Field()
  institutionName: string;

  @ApiProperty({ description: 'The unique slug for the institution' })
  @Field()
  slug: string;

  @ApiProperty({ description: 'The passcode for the institution' })
  @Field()
  passCode: string;

  @ApiProperty({ description: 'The logo URL of the institution', required: false })
  @Field({ nullable: true })
  logo?: string;

  @ApiProperty({ description: 'The school color of the institution', required: false })
  @Field({ nullable: true })
  schoolColor?: string;

  @ApiProperty({ description: 'The date the institution was created' })
  @Field()
  createdAt: Date;

  @ApiProperty({ description: 'The date the institution was last updated' })
  @Field()
  updatedAt: Date;
}
