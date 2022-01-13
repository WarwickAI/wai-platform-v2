import { Field, InputType } from "type-graphql";

@InputType()
class VariantInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  link: string;
}

@InputType()
export class MerchInput {
  @Field()
  display: boolean;

  @Field()
  title: string;

  @Field()
  shortName: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field(() => [VariantInput])
  variants: VariantInput[];
}
