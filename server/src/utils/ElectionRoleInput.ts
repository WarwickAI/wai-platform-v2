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
  applicationTemplate: string;

  @Field()
  previewImg: string;

  @Field()
  canApply: boolean;

  @Field()
  canVote: boolean;
}
