import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GenderWise {
  @Field(() => Int)
  male: number;

  @Field(() => Int)
  female: number;
}

@ObjectType()
export class UniversityStats{
    @Field(() => [Int])
    impression: number[];

    @Field(() => GenderWise)
    genderWise: GenderWise;

    @Field(() => Int)
    listing: number;

    @Field(() => Int)
    totalCampaign: number;
}