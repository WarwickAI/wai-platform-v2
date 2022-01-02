import { Field, InputType } from "type-graphql";

@InputType()
export class TalkInput {
    @Field()
    title: string;

    @Field()
    shortName: string;

    @Field()
    description: string;

    @Field()
    cover: string;

    @Field()
    display: boolean;

    @Field()
    redirect: string;
}