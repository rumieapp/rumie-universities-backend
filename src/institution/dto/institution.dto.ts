import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class InstitutionDto {
  @Field(() => ID)
  id: string;

  @Field()
  institutionName: string;

  @Field()
  slug: string;

  @Field()
  passCode: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  schoolColor?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
