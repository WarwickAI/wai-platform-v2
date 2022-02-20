import { Field, InputType } from "type-graphql";

@InputType()
export class BadgeInput {
  @Field()
  title: string;

  @Field()
  shortName: string;

  @Field()
  description: string;

  @Field()
  color: string;

  @Field(() => String, { nullable: true })
  assignableFrom?: Date;

  @Field(() => String, { nullable: true })
  assignableTo?: Date;
}
