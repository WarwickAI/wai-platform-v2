import { Field, InputType } from "type-graphql";

@InputType()
export class ProjectInput {
    @Field()
    title: string;

    @Field()
    shortName: string;

    @Field()
    description?: string;

    @Field()
    difficulty?: string;

    @Field()
    cover?: string;

    @Field()
    display: boolean;

    @Field()
    redirect: string;
}