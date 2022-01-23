import { Field, InputType } from "type-graphql";

@InputType()
export class EventInput {
  @Field()
  title: string;

  @Field()
  shortName: string;

  @Field()
  description?: string;

  @Field()
  display: boolean;

  @Field(() => [Number])
  tags: number[];

  @Field()
  previewImg: string;

  @Field()
  iconImg: string;

  @Field()
  coverImg: string;

  @Field()
  redirectUrl: string;

  @Field()
  joinable: boolean;
}
