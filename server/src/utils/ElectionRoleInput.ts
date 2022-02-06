import { Field, InputType } from "type-graphql";

@InputType()
export class ElectionRoleInput {
  @Field()
  display: boolean;

  @Field()
  title: string;

  @Field()
  shortName: string;

  @Field()
  description: string;

  @Field()
  previewImg: string;
}
