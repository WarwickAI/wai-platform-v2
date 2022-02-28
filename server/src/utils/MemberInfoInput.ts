import { Field, InputType } from "type-graphql";


@InputType()
export class MemberInfoInput {
  @Field()
  name: string

  @Field()
  uniId: number

  @Field()
  dataJoined: string
}
