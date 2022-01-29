import { Field, InputType } from "type-graphql";

@InputType()
export class TagInput {
  @Field()
  title: string;

  @Field()
  color: string;
}
