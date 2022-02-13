import { Field, InputType } from "type-graphql";

@InputType()
export class RoleManifestoInput {
  @Field()
  display: boolean;

  @Field()
  title: string;

  @Field()
  shortName: string;

  @Field()
  description: string;

  @Field()
  img: string;
}

@InputType()
export class ApplyRoleInput {
  @Field()
  title: string;

  @Field()
  shortName: string;

  @Field()
  description: string;

  @Field()
  img: string;
}
